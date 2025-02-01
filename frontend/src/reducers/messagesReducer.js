import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMessages } from "../chatServer";

const initialState = {
  messages: {}
};

export const setMessages = createAsyncThunk(
  'chat/setMessages',
  async (token) => {
    const response = await getMessages(token);
    return response;
  },
);


const slice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    newMessage(state, { payload }) {
      if (!state.messages[payload.channelId]) {
        state.messages[payload.channelId] = [];
    }
      state.messages[payload.channelId].push(payload); 
  },
  },
  extraReducers: (builder) => {
    builder.addCase(setMessages.fulfilled, (state, { payload }) => {
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

export const { newMessage } = slice.actions;
export default slice.reducer;