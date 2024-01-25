// src/components/LoginForm.js

import React, { useState } from "react";
import { navigate } from "gatsby";
import { css } from "@emotion/react";
import { Button, TextField, Switch } from "@mui/material";
import fakeAuthService from "../../utils/apiFetch";
import colors from "../../utils/colors";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const isAuthenticated = fakeAuthService.login(username, password);

    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      console.error("Inicio de sesión fallido");
    }
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <form onSubmit={handleLogin} css={styles.formStyles}>
      <div css={styles.circle}>
        <div css={styles.circleInside}>
          <p>👨‍💻</p>
        </div>
      </div>

      <div css={styles.container}>
        <TextField
          id="outlined-password-input"
          label="Username"
          type="text"
          color="secondary"
          css={styles.inputStyles}
        />

        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          color="secondary"
          css={styles.inputStyles}
        />

        <div>
          <Switch {...label} defaultChecked />
          Guardar
        </div>

        <Button variant="container" css={styles.buttonStyles}>
          Iniciar sesión
        </Button>
      </div>
    </form>
  );
};

const styles = {
  formStyles: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 500px;
    max-width: 700px;
    height: 500px;
    border-radius: 20px;
    position: relative;
    background-color: white;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    margin: 0 auto;
    padding: 20px;

    @media (max-width: 600px) {
      min-width: 80%;
      // height: 70%;
    }
  `,
  circle: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 180px;
    width: 180px;
    border-radius: 100px;
    position: absolute;
    top: -100px;
    background-color: white;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);

    @media (max-width: 600px) {
      height: 150px;
      width: 150px;
      top: -75px;
    }
  `,
  circleInside: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 165px;
    width: 165px;
    border-radius: 80px;
    background-color: ${colors.purple};
    & p {
      font-size: 100px;
    }

    @media (max-width: 600px) {
      height: 130px;
      width: 130px;
      & p {
        font-size: 80px;
      }
    }
  `,
  container: css`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    width: 80%;
    height: 55%;
    margin: 20px auto;

    @media (max-width: 600px) {
      justify-content: space-around;
      width: 90%;
      height: 80%;
    }
  `,
  inputStyles: css`
    width: 100%;
    margin-bottom: 15px;
  `,
  buttonStyles: css`
    width: 100%;
    background-color: ${colors.purple};
    color: white;
  `,
};

export default LoginForm;
