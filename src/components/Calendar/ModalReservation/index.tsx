import React, { useState } from "react";
import modalReservationValidationSchema from "./validationSchema";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotesIcon from "@mui/icons-material/Notes";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import WaveSVG from "../../../assets/svg/wave.svg";

import Form from "../../Form";
import { css } from "@emotion/react";
import colors from "../../../utils/colors";
import ConfirmationModal from "../../ConfirmationModal";

const ModalReservation = ({
  isModalOpen,
  closeModal,
  handleEventBooking,
  selectedEvent,
}) => {
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const formattedDate = selectedEvent?.date?.split("T")[0];
  const formattedHours = new Date(selectedEvent?.date)?.getUTCHours();

  const handleConfirmBooking = () => {
    handleEventBooking();
    closeModal();
    setConfirmationModalOpen(false);
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={() => {
          closeModal();
        }}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        closeAfterTransition
      >
        <Fade in={isModalOpen}>
          <Box css={modalStyles}>
            <IconButton
              aria-label="close"
              onClick={closeModal}
              css={closeButtonStyles}
              size="medium"
            >
              <CloseIcon />
            </IconButton>
            <h2 css={{ color: colors.purple }} id="modal-title">
              Reserva de Evento
            </h2>
            <p css={descriptionStyles}>Agrega un evento</p>
            <Form
              validationSchema={modalReservationValidationSchema}
              onSubmit={(data) => setConfirmationModalOpen(true)}
              inputProps={{
                name: {
                  label: "Nombre",
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon style={{ color: colors.purple }} />
                    </InputAdornment>
                  ),
                },
                note: {
                  label: "Nota (Opcional)",
                  startAdornment: (
                    <InputAdornment position="start">
                      <NotesIcon style={{ color: colors.purple }} />
                    </InputAdornment>
                  ),
                },
                phone: {
                  label: "Teléfono",
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon style={{ color: colors.purple }} />
                    </InputAdornment>
                  ),
                },
                email: {
                  label: "Correo Electrónico (Opcional)",
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon style={{ color: colors.purple }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <WaveSVG
              style={{
                flex: 1,
                width: "100%",
                position: "absolute",
                bottom: 0,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
            />
          </Box>
        </Fade>
      </Modal>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        onConfirm={handleConfirmBooking}
        title="Revisa tu información"
        message={`¿Estás seguro de que deseas hacer una reservacion con la siguiente fecha: ${formattedDate}`}
        confirmButtonText={"Aceptar"}
        cancelButtonText={"Cancelar"}
      />
    </>
  );
};

const modalStyles = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 40%;
  height: 80%;
  background-color: white;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const closeButtonStyles = css`
  position: absolute;
  top: -18px;
  right: -18px;
  z-index: 999;
  background-color: ${colors.purple};
  color: white;
  border-radius: 50%;
`;

const descriptionStyles = css`
  margin-bottom: 20px;
  font-size: 16px;
  color: ${colors.darkpink};
  font-weight: bold;
`;

const dateLabelStyles = css`
  position: absolute;
  top: 10px;
  left: 10px;
  color: ${colors.purple};
`;

const eventIdStyles = css`
  position: absolute;
  bottom: 10px;
  color: white;
  font-size: 10px;
  font-weight: bold;
`;

export default ModalReservation;
