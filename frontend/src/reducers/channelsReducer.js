import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getChannels } from "../chatServer";

const initialState = {
    channels: [],
    activeChannel: 0,
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
      setActiveChannel(state, { payload }) {
        state.activeChannel = payload;
    },
      newChannel(state, { payload }) {
        state.channels.push(payload);
        state.activeChannel = state.channels.length - 1;
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
  
  export const { setActiveChannel, newChannel } = slice.actions;
  export default slice.reducer;