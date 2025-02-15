import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMessages } from "../chatServer";
import { removeChannel } from "./channelsReducer";

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
      state.messages.push(payload);
  },
  },
  extraReducers: (builder) => {
    builder.addCase(setMessages.fulfilled, (state, { payload }) => {
      state.messages = payload;
    }).addCase(setMessages.rejected, (state, { payload }) => {
      console.log(payload, 'Возникла ошибка');
    }).addCase(removeChannel, (state, { payload }) => {
      const newMessages = state.messages.filter(m => m.channelId !== payload.id);
      state.messages = newMessages;
    });
  }
});

export const { newMessage, changeMessageField } = slice.actions;
export default slice.reducer;