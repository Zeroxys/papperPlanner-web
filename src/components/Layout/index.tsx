import React from "react";
// import { Link } from "gatsby";
import { css } from "@emotion/react";
import MenuBar from "../AppBar";

const Layout = ({ children }) => {
  return (
    <div css={styles.layoutContainer}>
      <MenuBar />
      <main css={styles.main}>{children}</main>
    </div>
  );
};

const styles = {
  layoutContainer: css`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  `,
  main: css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  `,
};

export default Layout;
