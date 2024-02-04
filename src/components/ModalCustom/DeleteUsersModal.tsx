import React from "react";
import { Modal, Button } from "@mui/material";
import { css } from "@emotion/react";

const DeleteUsersModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div css={styles.modalContent}>
        <h2>¿Estás seguro de eliminar los usuarios seleccionados?</h2>
        <Button variant="contained" color="primary" onClick={onConfirm}>
          Confirmar
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

export default DeleteUsersModal;
