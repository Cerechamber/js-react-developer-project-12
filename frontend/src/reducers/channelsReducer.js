import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getChannels } from "../contexts/ChatProvider";

const initialState = {
    channels: [],
    activeChannel: {},
    initiator: false,
    firstLoadChannels: false,
    errorLoadChannels: false,
  };

  export const setChannels = createAsyncThunk(
    'chat/setChannels',
    async (token) => {
      const response = await getChannels(token);
      return response;
    },
  );

  const slice = createSlice({
    name: "channels",
    initialState,
    reducers: {
      setInitiator(state, { payload }) {
        state.initiator = payload;
      },
      switchChannel(state, { payload }) {
        let newActiveChannel = [];
        if (payload.name) {
          state.channels.push(payload);
        if (state.initiator) {
          newActiveChannel = state.channels.find(c => c.id === payload.id);
          state.activeChannel = newActiveChannel;
        }
        state.initiator = false;
        } else {
          newActiveChannel = state.channels.find(c => c.id === payload);
          state.activeChannel = newActiveChannel;
        }
      },
      renameChannel(state, { payload }) {
        const editedChannel = state.channels.find(c => c.id === payload.id);
        editedChannel.name = payload.name;
      },
      removeChannel(state, { payload }) {
        if (state.activeChannel.id === payload.id) {
          state.activeChannel = state.channels[0];
        }
        const newChannels = state.channels.filter(c => c.id !== payload.id);
        state.channels = newChannels;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(setChannels.fulfilled, (state, { payload }) => {
        state.channels = payload;
        state.activeChannel = payload[0];
        state.firstLoadChannels = true;
        state.errorLoadChannels = false;
      }).addCase(setChannels.rejected, (state, { payload }) => {
            state.errorLoadChannels = true;
      })
    }
  });
  
  export const { switchChannel, setInitiator, renameChannel, removeChannel } = slice.actions;
  export default slice.reducer;