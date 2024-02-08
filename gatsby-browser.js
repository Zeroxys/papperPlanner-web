import React from "react";
import { Provider } from "react-redux";
import BackdropCustom from "./src/components/BackdropCustom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/redux/store";
import { navigate } from "gatsby";
import "./src/styles/global.css";

export const ReduxProvider = ({ element }) => {
  const { bearerToken } = store.getState().auth;

  if (!bearerToken) {
    navigate("/login");
  } else {
    navigate("/");
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BackdropCustom />
        {element}
      </PersistGate>
    </Provider>
  );
};

export const wrapRootElement = ({ element }) => {
  return <ReduxProvider element={element} />;
};
