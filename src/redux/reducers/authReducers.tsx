const initialState = {
  bearerToken: null,
  refreshToken: null,
  bearerInfo: {
    createdAt: null,
    expirationDate: null,
  },
  userId: null,
};

const authReducer = (
  state = initialState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case "SET_BEARER_INFO":
      return {
        ...state,
        bearerToken: action.token,
        bearerInfo: { ...action.payload },
      };
    case "LOGIN_SUCCESS":
      return { ...state, ...action.payload };
    // case "LOG_OUT":
    //   return { ...initialState };
    default:
      return state;
  }
};

export default authReducer;
