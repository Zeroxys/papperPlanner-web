// src/components/LoginForm.js

import React, { useState } from "react";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  TextField,
  Switch,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useApiFetch from "../../hooks/apiFetch";
import ModalCustom from "../ModalCustom";
import { setLoginSuccess } from "../../redux/actions/authActions";
import {
  enableSaveUserAction,
  enableBackdropAction,
} from "../../redux/actions/userActions";
import colors from "../../utils/colors";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { fetchApi, error } = useApiFetch();
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { saveSwitchUser } = useSelector(({ user }) => user);

  const handleLogin = async () => {
    dispatch(enableBackdropAction(true));
    const res = await fetchApi("POST", "/auth/login", {
      email: username,
      password,
    });

    if (res.success) {
      dispatch(setLoginSuccess(res));
    } else {
      dispatch(enableBackdropAction(false));
      setOpenModal(true);
    }
  };

  const handleSwitchChange = () => {
    dispatch(enableSaveUserAction());
  };

  return (
    <form css={styles.formStyles}>
      <ModalCustom open={openModal} setOpen={setOpenModal} message={error} />
      <div css={styles.circle}>
        <div css={styles.circleInside}>
          <p>👨‍💻</p>
        </div>
      </div>

      <div css={styles.container}>
        <TextField
          id="username"
          label="Email"
          type="text"
          color="secondary"
          css={styles.inputStyles}
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />

        <TextField
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          color="secondary"
          css={styles.inputStyles}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="start"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <div>
          <Switch
            css={styles.switchStyle}
            defaultChecked={saveSwitchUser}
            color="secondary"
            onChange={handleSwitchChange}
          />
          Guardar
        </div>

        <Button
          onClick={handleLogin}
          variant="container"
          css={styles.buttonStyles}
        >
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
    position: relative;
    background-color: white;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    margin: 0 auto;
    padding: 20px;
    position: absolute;
    bottom: 10%;

    @media (max-width: 600px) {
      min-width: 80%;
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
    &:hover {
      background-color: ${colors.darkpink};
    }
  `,
};

export default LoginForm;
