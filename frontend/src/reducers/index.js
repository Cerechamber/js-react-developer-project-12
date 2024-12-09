import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import chatReducer from "./chatReducer";

export default configureStore({
  reducer: {
    authReducer,
    chatReducer,
  },
});
