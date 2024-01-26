import React from "react";
import { Provider } from "react-redux";
// import store from "./src/redux/store";
import "./src/styles/global.css";
import BackdropCustom from "./src/components/BackdropCustom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/redux/store";

export const wrapRootElement = ({ element }) => {
  console.log(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BackdropCustom />
        {element}
      </PersistGate>
    </Provider>
  );
};
