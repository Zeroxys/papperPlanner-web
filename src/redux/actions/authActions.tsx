import { navigate } from "gatsby";

export const setBearerInfoAction = (bearerInfo) => {
  return {
    type: "SET_BEARER_INFO",
    payload: bearerInfo.info,
    token: bearerInfo.token,
  };
};

export const setLoginSuccess = ({ bearerToken, refreshToken, user }) => {
  navigate("/");
  return {
    type: "LOGIN_SUCCESS",
    payload: {
      bearerToken,
      refreshToken,
      userId: user,
    },
  };
};

export const setLogOutAction = () => {
  navigate("/login");
  return {
    type: "LOG_OUT",
    payload: {},
  };
};
