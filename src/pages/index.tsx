import React, { useState } from "react";
import Layout from "../components/Layout";
import { css } from "@emotion/react";
import color from "../utils/colors";
import MenuBar from "../components/AppBar";
import { useSelector } from "react-redux";

const IndexPage = () => {
  const auth = useSelector(({ auth }) => auth);

  console.log(auth);
  return (
    <div>
      <MenuBar />
    </div>
  );
};

export default IndexPage;
