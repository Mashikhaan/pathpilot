import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isCheckingAuth: true,
    isLoggingIn: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateInterviewCoin: (state, action) => {
      if (state.user) {
        state.user.interviewCoin = action.payload;
      }
    },
    setCheckingAuth: (state, action) => {
      state.isCheckingAuth = action.payload;
    },
    setLoggingIn: (state, action) => {
      state.isLoggingIn = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setUser,
  setCheckingAuth,
  setLoggingIn,
  setError,
  updateInterviewCoin
} = authSlice.actions
export default authSlice.reducer;
