import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: [],
  activeChannel: '1',
  messages: {},
};

const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      state.channels = payload;
    },
    setActiveChannel(state, { payload }) {
        state.activeChannel = payload;
    },
    setMessages(state, { payload }) {
        payload.forEach(item => {
            if (!state.messages[item.channelId]) {
                state.messages[item.channelId] = [];
            }
            state.messages[item.channelId].push(item); 
        });
    },
  },
});

export const { actions } = slice;
export default slice.reducer;