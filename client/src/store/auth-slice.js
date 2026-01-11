import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dialCode: "+91",
  phoneNumber: "",
  isSignInOpen: true,
  isSignUpOpen: false,
  isVerificationOpen: false,
  dashBoardOpen: false,
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openSignIn(state) {
      state.isSignInOpen = true;
      state.isSignUpOpen = false;
    },
    openSignUp(state) {
      state.isSignInOpen = false;
      state.isSignUpOpen = true;
    },
    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    setDialCode(state, action) {
      state.dialCode = action.payload;
    },
    openDashBoard(state) {
      state.dashBoardOpen = true;
    },
    setUser(state, action) {
      state.user = { ...action.payload };
    },
  },
});

export const {
  openSignIn,
  openSignUp,
  setPhoneNumber,
  setDialCode,
  openDashBoard,
  setUser,
} = authSlice.actions;
export default authSlice.reducer;
