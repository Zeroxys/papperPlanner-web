import React from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import "./src/styles/global.css";
import BackdropCustom from "./src/components/BackdropCustom";

export const wrapRootElement = ({ element }) => {
  return (
    <Provider store={store()}>
      <BackdropCustom />
      {element}
    </Provider>
  );
};
