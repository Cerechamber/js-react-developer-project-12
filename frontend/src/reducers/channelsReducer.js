import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getChannels } from "../chatServer";

const initialState = {
    channels: [],
    activeChannel: 0,
    initiator: false,
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
        if (payload.name) {
          state.channels.push(payload);
        if (state.initiator) {
          state.activeChannel = state.channels.length - 1;
        }
        state.initiator = false;
        } else {
          state.activeChannel = payload;
        }
      },
      renameChannel(state, { payload }) {
        const editedChannel = state.channels.find(c => c.id === payload.id);
        editedChannel.name = payload.name;
      },
      removeChannel(state, { payload }) {
        console.log('deleted',payload);
      },
    },
    extraReducers: (builder) => {
      builder.addCase(setChannels.fulfilled, (state, { payload }) => {
        state.channels = payload;
      }).addCase(setChannels.rejected, (state, { payload }) => {
        console.log(payload, 'Возникла ошибка');
      })
    }
  });
  
  export const { switchChannel, setInitiator, renameChannel, removeChannel } = slice.actions;
  export default slice.reducer;