import { navigate } from "gatsby";

export const enableSaveUserAction = () => ({
  type: "ENABLE_SAVE_USER",
});

export const enableBackdropAction = (isActive: boolean) => ({
  type: "ENABLE_BACKDROP",
  payload: isActive,
});

export const setUserAction = (user: { any: any }) => ({
  type: "SET_USER",
  payload: { ...user },
});
