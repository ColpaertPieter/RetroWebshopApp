import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "session",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    setAuthenticatedTrue: (state, payload) => {
      state.isAuthenticated = true;
    },
    setAuthenticatedFalse: (state, payload) => {
      state.isAuthenticated = false;
    },
  },
});

export const { actions, reducer } = authSlice;
export const { setAuthenticatedFalse, setAuthenticatedTrue } = actions;
