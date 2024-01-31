import React from "react";
import { css } from "@emotion/react";
import LoginForm from "../components/Login";

const LoginPage = () => {
  return (
    <div css={styles.container}>
      <LoginForm />
    </div>
  );
};

const styles = {
  container: css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  `,
};

export default LoginPage;
