export const loginAction = (user) => ({
  type: "LOGIN",
  payload: user,
});

export const logoutAction = () => ({
  type: "LOGOUT",
});

export const enableBackdropAction = () => ({
  type: "ENABLE_BACKDROP",
});
