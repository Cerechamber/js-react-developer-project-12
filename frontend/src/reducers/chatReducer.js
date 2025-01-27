import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getChannels, getMessages } from "../chatServer";

const initialState = {
  channels: [],
  activeChannel: '1',
  messages: {},
};

export const setChannels = createAsyncThunk(
  'chat/setChannels',
  async (token) => {
    const response = await getChannels(token);
    return response;
  },
);

export const setMessages = createAsyncThunk(
  'chat/setMessages',
  async (token) => {
    const response = await getMessages(token);
    return response;
  },
);


const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveChannel(state, { payload }) {
      state.activeChannel = payload;
  },
  },
  extraReducers: (builder) => {
    builder.addCase(setChannels.fulfilled, (state, { payload }) => {
      state.channels = payload;
    }).addCase(setChannels.rejected, (state, { payload }) => {
      console.log(payload, 'Возникла ошибка');
    }).addCase(setMessages.fulfilled, (state, { payload }) => {
      state.messages = {};
      payload.forEach(item => {
        if (!state.messages[item.channelId]) {
            state.messages[item.channelId] = [];
        }
        state.messages[item.channelId].push(item); 
    });
    }).addCase(setMessages.rejected, (state, { payload }) => {
      console.log(payload, 'Возникла ошибка');
    });

  }
});

export const { setActiveChannel } = slice.actions;
export default slice.reducer;