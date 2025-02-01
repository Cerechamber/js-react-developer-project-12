import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersReducer";
import channelsReducer from "./channelsReducer";
import messagesReducer from "./messagesReducer";
import logger from "../middlewares";

export default configureStore({
  reducer: {
    usersReducer,
    channelsReducer,
    messagesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
