import React from "react";
import { Provider } from "react-redux";
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
