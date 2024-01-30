import React, { useEffect } from "react";
import { navigate } from "gatsby";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import BackdropCustom from "./src/components/BackdropCustom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/redux/store";
import "./src/styles/global.css";

export const wrapRootElement = ({ element }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BackdropCustom />
        {element}
      </PersistGate>
    </Provider>
  );
};

export const wrapPageElement = ({ element, props }) => {
  // console.log(store.getState().auth);

  // const isLoggedIn = store.getState().auth.bearerToken;

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate("/login");
  //     return null;
  //   }
  // }, []);

  return element;
};
