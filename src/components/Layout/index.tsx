import React from "react";
// import { Link } from "gatsby";
import { css } from "@emotion/react";
import MenuBar from "../AppBar";
import {
  AppBar,
  Typography,
} from "@mui/material";
import colors from "../../utils/colors";

const Layout = ({ verified, children }) => {
  return (
    <div css={styles.layoutContainer}>
      {verified ? <MenuBar /> :
        <AppBar css={styles.appBar} >
          <Typography variant="h6" component="h1">
            EVENTLY
          </Typography>
        </AppBar>}

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
  appBar: css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align:center;
  height:50px;
  background-color: ${colors.purple};
 `
};

export default Layout;
