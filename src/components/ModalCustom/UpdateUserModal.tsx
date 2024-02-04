import React, { useState } from "react";
import { Modal, Button, Select, MenuItem } from "@mui/material";
import { css } from "@emotion/react";

const UpdateUserModal = ({ open, onClose, onUpdateRole }) => {
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleUpdateRole = () => {
    onUpdateRole(selectedRole);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div css={styles.modalContent}>
        <h2>Selecciona el nuevo rol:</h2>
        <Select value={selectedRole} onChange={handleRoleChange}>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="vip">VIP</MenuItem>
          <MenuItem value="free">Free</MenuItem>
          <MenuItem value="demo">Demo</MenuItem>
        </Select>
        <Button variant="contained" color="primary" onClick={handleUpdateRole}>
          Actualizar Rol
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

export default UpdateUserModal;
