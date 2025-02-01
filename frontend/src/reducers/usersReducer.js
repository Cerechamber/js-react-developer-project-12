import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: "",
  token: "",
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.currentUser = payload.currentUser;
      state.token = payload.token;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;