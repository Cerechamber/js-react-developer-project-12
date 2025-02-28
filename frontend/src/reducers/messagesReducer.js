import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { removeChannel } from "./channelsReducer";
import { getMessages } from "../contexts/ChatProvider";

const initialState = {
  messages: {},
  firstLoadMessages: false,
  errorLoadMessages: false,
  messagesLoading: false,
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
    builder.addCase(setMessages.pending, (state, { payload }) => {
      state.messagesLoading = true;
    }).addCase(setMessages.fulfilled, (state, { payload }) => {
      state.messages = payload;
      state.firstLoadMessages = true;
      state.errorLoadMessages = false;
      state.messagesLoading = false;
    }).addCase(setMessages.rejected, (state, { payload }) => {
         state.errorLoadMessages = true;
         state.messagesLoading = false;
    }).addCase(removeChannel, (state, { payload }) => {
      const newMessages = state.messages.filter(m => m.channelId !== payload.id);
      state.messages = newMessages;
    });
  }
});

export const { newMessage, changeMessageField } = slice.actions;
export default slice.reducer;