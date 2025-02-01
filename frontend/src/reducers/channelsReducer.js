import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getChannels } from "../chatServer";

const initialState = {
    channels: [],
    activeChannel: '1',
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
    },
    extraReducers: (builder) => {
      builder.addCase(setChannels.fulfilled, (state, { payload }) => {
        state.channels = payload;
      }).addCase(setChannels.rejected, (state, { payload }) => {
        console.log(payload, 'Возникла ошибка');
      })
    }
  });
  
  export const { setActiveChannel } = slice.actions;
  export default slice.reducer;