import React from "react";
import { Box, Backdrop, Modal, Fade, Typography, Button } from "@mui/material";
import { css } from "@emotion/react";
import colors from "../../utils/colors";

const ModalCustom = ({ open, setOpen, message }) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box css={style.box}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            <strong>Oops, Hubo un Problema 😦</strong>
          </Typography>
          <Typography
            textAlign={"left"}
            id="transition-modal-description"
            sx={{ mt: 2 }}
          >
            Hemos detectado un error con el siguiente mensaje:
            <strong> {message}</strong>. Por favor, revisa cuidadosamente la
            información proporcionada e inténtalo de nuevo.
          </Typography>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Aceptar
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

const style = {
  box: css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    min-height: 220px;
    background-color: ${colors.white};
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);
    padding: 16px;
    border-radius: 22px;
    width: 28rem;

    @media (max-width: 600px) {
      width: 90%;
    }
  `,
};

export default ModalCustom;
