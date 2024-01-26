import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoggedIn: false,
  enableBackdrop: false,
};

const authReducer = (
  state = initialState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    case "ENABLE_BACKDROP":
      return {
        ...state,
        enableBackdrop: !state.enableBackdrop,
      };
    default:
      return state;
  }
};

export default authReducer;
