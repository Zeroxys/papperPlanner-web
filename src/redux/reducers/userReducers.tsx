const initialState = {
  user: {},
  isLoggedIn: false,
  enableBackdrop: false,
  saveSwitchUser: false,
};

const userReducer = (
  state = initialState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: { ...action.payload },
      };
    case "ENABLE_BACKDROP":
      return {
        ...state,
        enableBackdrop: action.payload,
      };
    case "ENABLE_SAVE_USER":
      return {
        ...state,
        saveSwitchUser: !state.saveSwitchUser,
      };
    default:
      return state;
  }
};

export default userReducer;
