import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', // authenticated, not-authenticated, checking
    user: {},
    errorMessage: null,
  },
  reducers: {
    onCheking: (state, action) => {
      state.status = 'checking';
      state.user = {};
      state.errorMessage = null;
    },
    onLogin: (state, action) => {
      state.status = 'authenticated';
      state.user = action.payload;
      state.errorMessage = null;
    },
    onLogout: (state, action) => {
      state.status = 'not-authenticated';
      state.user = {};
      state.errorMessage = action.payload || null;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onLogin, onCheking, onLogout, clearErrorMessage } =
  authSlice.actions;
