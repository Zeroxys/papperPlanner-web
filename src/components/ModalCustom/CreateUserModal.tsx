import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { css } from "@emotion/react";

const CreateUserModal = ({ open, onClose, onCreateUser }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleCreateUser = () => {
    onCreateUser(formData);
    handleClean();
  };

  const handleClean = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div css={styles.modalContent}>
        <h2>Crear Nuevo Usuario</h2>
        <TextField
          css={styles.inputs}
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          css={styles.inputs}
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          css={styles.inputs}
          label="Password"
          name="password"
          autoComplete=""
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={toggleShowPassword}>
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div css={styles.buttonsContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateUser}
          >
            Crear
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              handleClean();
            }}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const styles = {
  modalContent: css`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 22px;
    outline: none;
    text-align: center;
    height: 50%;
    width: 50%;
  `,
  buttonsContainer: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 40%;
  `,
  inputs: css`
    width: 50%;
  `,
};

export default CreateUserModal;
