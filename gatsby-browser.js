import React from "react";
import { Provider } from "react-redux";
import BackdropCustom from "./src/components/BackdropCustom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/redux/store";
import { navigate } from "gatsby";

import "./src/styles/global.css";

export const ReduxProvider = ({ element }) => {
  const { bearerToken } = store.getState().auth;
  if (window) {
    const { pathname } = window.location;
    // const isCalendarRoute = /^\/calendar\/\w+$/.test(pathname);
    const isCalendarRoute = /^\/calendar\//.test(pathname);
    const isVerifyEmailRoute = /^\/verifyEmail\//.test(pathname);
    
    if (!bearerToken && !isCalendarRoute && !isVerifyEmailRoute) {
      navigate("/login");
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BackdropCustom />
            {element}
          </PersistGate>
        </Provider>
      );
    }

    if (isCalendarRoute && !bearerToken) {
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BackdropCustom />
            {element}
          </PersistGate>
        </Provider>
      );
    }

    if (bearerToken) {
      navigate("/");
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BackdropCustom />
            {element}
          </PersistGate>
        </Provider>
      );
    }


    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BackdropCustom />
          {element}
        </PersistGate>
      </Provider>
    );


    // return (
    //   <Provider store={store}>
    //     <PersistGate loading={null} persistor={persistor}>
    //       <BackdropCustom />
    //       {element}
    //     </PersistGate>
    //   </Provider>
    // );
  }
};

export const wrapRootElement = (props) => {
  const { element } = props;

  return <ReduxProvider element={element} />;
};
