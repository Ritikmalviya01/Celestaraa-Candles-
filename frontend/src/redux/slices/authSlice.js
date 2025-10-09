import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,    // { name, email, ... }
  role: null,    // "USER" or "ADMIN"
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user; // { name, email, etc. }
      state.role = action.payload.role; // "ADMIN" or "USER"
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
