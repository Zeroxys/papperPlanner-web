import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { css } from "@emotion/react";

const CreateUserModal = ({ open, onClose, onCreateUser }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreateUser = () => {
    // Realiza la lógica de creación de usuario aquí
    onCreateUser(formData);
    // Cierra el modal después de la creación
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div css={styles.modalContent}>
        <h2>Crear Nuevo Usuario</h2>
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={handleCreateUser}>
          Crear Usuario
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </Modal>
  );
};

const styles = {
  modalContent: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 22px;
    outline: none;
    text-align: center;
  `,
};

export default CreateUserModal;
