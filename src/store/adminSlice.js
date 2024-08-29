import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  adminData: null,
};

const adminAuthSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.adminData = action.payload.adminData;
    },
    logout: (state, action) => {
      state.status = false;
      state.adminData = null;
    },
  },
});

export const { login, logout } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
