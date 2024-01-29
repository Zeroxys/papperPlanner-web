const initialState = {
  bearerToken: null,
  refreshToken: null,
  user: {},
  isLoggedIn: false,
  enableBackdrop: false,
  saveSwitchUser: false,
  bearerInfo: {
    createdAt: null,
    expirationDate: null,
  },
  userId: null,
  rememberMe: null,
  loginCount: 0,
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
    case "SET_BEARER_INFO":
      return {
        ...state,
        bearerToken: action.token,
        bearerInfo: { ...action.payload },
      };
    case "ENABLE_BACKDROP":
      return {
        ...state,
        enableBackdrop: !state.enableBackdrop,
      };
    case "ENABLE_SAVE_USER":
      return {
        ...state,
        saveSwitchUser: !state.saveUser,
      };
    case "LOGIN_SUCCESS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default authReducer;
