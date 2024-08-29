import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./orderSlice.js";
import authSlice from "./authSlice.js";
import adminSlice from "./adminSlice.js";

const store = configureStore({
  reducer: {
    admin: adminSlice,
    auth: authSlice,
    order: orderSlice,
  },
});

export default store;
