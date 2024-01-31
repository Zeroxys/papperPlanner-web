import React, { useState } from "react";
import Layout from "../components/Layout";
import MenuBar from "../components/AppBar";
import { useSelector } from "react-redux";

const IndexPage = () => {
  const user = useSelector(({ user }) => user);
  const auth = useSelector(({ auth }) => auth);

  console.log(auth);

  return (
    <Layout>
      <h1>Holi</h1>
    </Layout>
  );
};

export default IndexPage;
