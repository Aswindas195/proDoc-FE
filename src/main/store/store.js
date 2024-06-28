import { configureStore } from "@reduxjs/toolkit";
import { ResultReducer } from "../slice/slice";

export const store = configureStore({
  reducer: {
    result: ResultReducer,
  },
});
