// store.js
import { legacy_createStore as createStore } from "redux";

// Define tu reducer y estado inicial
const initialState = {
  user: null,
  isLoggedIn: false,
};

const rootReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

// Crea el store
const store = createStore(rootReducer);

export default store;
