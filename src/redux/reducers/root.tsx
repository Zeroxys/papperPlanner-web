import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authReducers";
import userReducer from "./userReducers";

const reducersCombined = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const reducers = (state, action) => {
  if (action.type === "LOG_OUT") {
    state = undefined;
  }

  return reducersCombined(state, action);
};

export default reducers;
