import { navigate } from "gatsby";

export const loginAction = async (user) => {
  console.log(user);

  return {
    type: "LOGIN",
    payload: user,
  };
};

export const logoutAction = () => ({
  type: "LOGOUT",
});

export const enableBackdropAction = () => ({
  type: "ENABLE_BACKDROP",
});

export const enableSaveUser = () => ({
  type: "ENABLE_SAVE_USER",
});

export const setLoginSuccess = (user) => {
  navigate("/");
  return {
    type: "LOGIN_SUCCESS",
    payload: {
      bearerToken: user.bearerToken,
      refreshToken: user.refreshToken,
      userId: user.user,
      loginCount: user.loginCount,
    },
  };
};

export const setBearerInfoAction = (bearerInfo) => {
  return {
    type: "SET_BEARER_INFO",
    payload: bearerInfo.info,
    token: bearerInfo.token,
  };
};
