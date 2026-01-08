import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice.js";
import UIreducer from "./UI-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: UIreducer,
  },
});
