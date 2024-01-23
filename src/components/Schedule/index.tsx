import React, { useState } from "react";
import { css } from "@emotion/react";
import Modal from "react-modal";
import colors from "../../utils/colors";

const Schedule = () => {
  const months = {
    January: {
      scheduleRange: [8, 18],
    },
  };

  const calendarMonth = "January";
  const { scheduleRange } = months[calendarMonth];

  const beginHour = scheduleRange[0];
  const lastHour = scheduleRange[1];

  const hoursOfDay = [];
  for (let i = beginHour; i <= lastHour; i++) {
    const hour = i < 10 ? `0${i}:00` : `${i}:00`;
    hoursOfDay.push(hour);
  }

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleEventBooking = () => {
    closeModal();
  };

  return (
    <div css={container}>
      {hoursOfDay.map((item, index) => (
        <div key={index} css={timeSlot}>
          <span css={timeLabel}>{item}</span>
          <div css={eventButtonContainer}>
            <div onClick={openModal} css={eventButton}>
              <span css={eventButtonText}>Agendar evento</span>
            </div>
          </div>
        </div>
      ))}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Formulario de Reserva"
        css={modalStyles}
        closeTimeoutMS={300} // Agrega esta línea para controlar el tiempo de animación de cierre
      >
        <h2>Reserva de Evento</h2>
        {/* Agrega aquí tu formulario de reserva */}
        <button onClick={handleEventBooking}>Reservar</button>
        <button onClick={closeModal}>Cancelar</button>
      </Modal>
    </div>
  );
};

const container = css`
  flex: 1;
  width: 90%;
`;

const timeSlot = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 16px;
  border-bottom: 1px solid lightgray;
  height: 70px;
  align-items: center;
`;

const timeLabel = css`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.purple};
`;

const eventButtonContainer = css`
  // border: 2px solid black;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const eventButton = css`
  width: 70%;
  border: 1px solid ${colors.purple};
  border-radius: 20px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

const eventButtonText = css`
  color: ${colors.pink};
  font-weight: bold;
  cursor: pointer;
`;

const modalStyles = css`
  border: 2px solid red;
  width: 300px;
  margin: auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
  // &:focus {
  //   outline: none;
  // }
  // &:active {
  //   transform: scale(0.98);
  // }
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default Schedule;
