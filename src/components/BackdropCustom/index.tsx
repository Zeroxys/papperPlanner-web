// src/components/LoginForm.js

import React from "react";
import { css } from "@emotion/react";
import { useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";
import colors from "../../utils/colors";

const BackdropCustom = () => {
  const enableBackdrop = useSelector(({ auth }) => auth.enableBackdrop);
  console.log(enableBackdrop);
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={enableBackdrop}
    >
      <CircularProgress css={styles.circle} />
    </Backdrop>
  );
};

const styles = {
  circle: css`
    color: ${colors.white};
  `,
};

export default BackdropCustom;
