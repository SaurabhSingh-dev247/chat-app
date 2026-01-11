import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
  openedImageSrc: "",
  profileSettingOpen: false,
  activeNav: "message",
  hoveredNav: "",
  logoutTabOpen: false,
  counter: 90,
};

export const UISlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    openModal(state, action) {
      if (action.payload && action.payload.image) {
        state.modalOpen = true;
        state.openedImageSrc = action.payload.image;
      }

      state.modalOpen = true;
    },
    closeModal(state) {
      state.modalOpen = false;
      state.openedImageSrc = "";
    },
    openSetting(state) {
      state.profileSettingOpen = true;
    },
    closeSetting(state) {
      state.profileSettingOpen = false;
    },
    setActiveNav(state, action) {
      state.activeNav = action.payload.activeNav;
    },
    setHoveredNav(state, action) {
      state.hoveredNav = action.payload.hoveredNav;
    },
    openLogoutTab(state) {
      state.logoutTabOpen = true;
    },
    closeLogoutTab(state) {
      state.logoutTabOpen = false;
    },
    decrementCouter(state) {
      if (state.counter > 0) {
        state.counter -= 1;
      } else {
        return;
      }
    },
  },
});

export const {
  openModal,
  closeModal,
  openSetting,
  closeSetting,
  setActiveNav,
  setHoveredNav,
  openLogoutTab,
  closeLogoutTab,
  decrementCouter,
} = UISlice.actions;

export default UISlice.reducer;
