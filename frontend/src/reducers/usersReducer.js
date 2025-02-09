import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  token: "",
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.username = payload.username;
      state.token = payload.token;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;