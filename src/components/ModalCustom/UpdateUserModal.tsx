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
        <h2>Actualización del usuario</h2>
        <div css={styles.userType}>
          <p>Selecciona el tipo de usuario:</p>
          <Select
            sx={{ width: 100 }}
            value={selectedRole}
            onChange={handleRoleChange}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="vip">VIP</MenuItem>
            <MenuItem value="free">Free</MenuItem>
            <MenuItem value="demo">Demo</MenuItem>
          </Select>
        </div>
        <div css={styles.buttonsContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateRole}
          >
            Actualizar
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancelar
          </Button>
        </div>
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 40%;
    height: 40%;
  `,
  buttonsContainer: css`
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 50%;
  `,
  userType: css`
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
  `,
};

export default UpdateUserModal;
