import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import chatReducer from "./chatReducer";
import logger from "../middlewares";

export default configureStore({
  reducer: {
    authReducer,
    chatReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
