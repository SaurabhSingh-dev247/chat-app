import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignInOpen: true,
  isSignUpOpen: false,
  phoneNumber: "",
  dialCode: "+91",
};

// console.log("Dial code from store: ", initialState.dialCode)

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
  },
});

export const { openSignIn, openSignUp, setPhoneNumber, setDialCode } =
  authSlice.actions;
export default authSlice.reducer;
