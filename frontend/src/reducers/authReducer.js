import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  token: "",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.name = payload.name;
      state.token = payload.token;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
