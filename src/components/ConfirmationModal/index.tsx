import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { css } from "@emotion/react";
import colors from "../../utils/colors";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonText,
  cancelButtonText,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
      closeAfterTransition
    >
      <Fade in={isOpen}>
        <Box css={confirmationModalStyles}>
          <IconButton
            aria-label="close"
            onClick={onClose}
            css={closeButtonStyles}
            size="large"
          >
            <CloseIcon />
          </IconButton>
          <h2
            css={{ color: colors.purple, marginTop: 12, padding: 0 }}
            id="confirmation-modal-title"
          >
            {title}
          </h2>
          <p css={descriptionStyles}>{message}</p>
          <div css={buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={onConfirm}
              css={buttonStyles}
            >
              {confirmButtonText}
            </Button>
            <Button variant="contained" onClick={onClose} css={buttonStyles}>
              {cancelButtonText}
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

const confirmationModalStyles = css`
  padding: 22px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 40%;
  background-color: white;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const closeButtonStyles = css`
  position: absolute;
  top: -10px;
  right: -10px;
  z-index: 999;
  background-color: ${colors.purple};
  color: white;
  width: 22px;
  height: 22px;
  border-radius: 50%;
`;

const descriptionStyles = css`
  margin-bottom: 20px;
  font-size: 14px;
  margin-left: auto;
  margin-right: auto;
  color: ${colors.darkpink};
  font-weight: bold;
`;

const buttonContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const buttonStyles = css`
  margin: 0 10px;
`;

export default ConfirmationModal;
