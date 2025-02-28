import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  token: "",
  blockSending: false,
  authProcess: false,
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
    },
    changeAuthProcess(state, { payload }) {
      state.authProcess = payload;
    }
  },
});

export const { setUser, changeBlockSending, changeAuthProcess } = slice.actions;
export default slice.reducer;