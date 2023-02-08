import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    TOKEN: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    handleLoginError: (state) => {
      state.error = false;
    },
    loginStart: (state) => {
      state.isFetching = true;
    },
    //action รับ res.data
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.TOKEN = action.payload.accessToken;
      state.error = false;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.TOKEN = null;
    },

    updateUserStart: (state) => {
      state.isFetching = true;
    },
    //action รับ res.data
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload
    },
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

  },
});

export const {
  handleLoginError,
  loginStart, loginSuccess, loginFailure, logout,
  updateUserStart, updateUserSuccess, updateUserFailure,
} = userSlice.actions;
export default userSlice.reducer;