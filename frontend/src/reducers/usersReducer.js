import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  token: "",
  blockSending: false,
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.username = payload.username;
      state.token = payload.token;
    },
    changeBlockSending(state, { payload }) {
      state.blockSending = payload;
    }
  },
});

export const { setUser, changeBlockSending } = slice.actions;
export default slice.reducer;