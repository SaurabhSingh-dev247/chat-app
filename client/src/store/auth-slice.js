import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignInOpen: true,
  isSignUpOpen: false,
  dashBoardOpen: false,
  userData: {},
  userFriends: [],
  selectedFriend: {},
  messages: { data: [], loading: false, error: "" },
  conversationId: "",
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
    openDashBoard(state) {
      state.dashBoardOpen = true;
    },
    setUser(state, action) {
      state.userData = { ...action.payload };
    },
    addFriends(state, action) {
      if (Array.isArray(action.payload)) {
        state.userFriends = action.payload;
        return;
      }
      state.userFriends.push(action.payload);
    },
    setSelectedFriend(state, action) {
      state.selectedFriend = { ...action.payload };
    },
    closeDashBoard(state) {
      state.dashBoardOpen = false;
    },

    addMessages(state, action) {
      if (Array.isArray(action.payload.message)) {
        state.messages.data = action.payload.message;
        return;
      } else {
        state.messages.data = [...state.messages.data, action.payload.message];
        return;
      }
    },
    addMoreChats(state, action) {
      if (Array.isArray(action.payload.message)) {
        state.messages.data = [
          ...action.payload.message,
          ...state.messages.data,
        ];
        return;
      }
    },
    setMessagesLoading(state, action) {
      state.messages.loading = action.payload;
    },
    setMessagesLoadingError(state, action) {
      state.messages.error = action.payload;
    },
    setConversationId(state, action) {
      state.conversationId = action.payload;
    },
    setActiveFriends(state, action) {
      const friend = state.userFriends.find(
        (f) => f.friend._id === action.payload.id,
      );

      if (friend) {
        friend.friend.status = action.payload.status;
      }
    },
    setSelectedFriendStatus(state, action) {
      if (state.selectedFriend._id === action.payload.id) {
        state.selectedFriend.status = action.payload.status;
        return;
      }
    },
  },
});

export const {
  openSignIn,
  openSignUp,
  openDashBoard,
  closeDashBoard,
  setUser,
  addFriends,
  setSelectedFriend,
  addMessages,
  setMessagesLoading,
  setMessagesLoadingError,
  setConversationId,
  setActiveFriends,
  setSelectedFriendStatus,
  addMoreChats,
} = authSlice.actions;
export default authSlice.reducer;
