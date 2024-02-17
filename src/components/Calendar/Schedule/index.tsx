import React, { useState } from "react";
import { css } from "@emotion/react";
import ModalReservation from "../ModalReservation";
import colors from "../../../utils/colors";

const Schedule = ({ events }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const openModal = (eventId) => {
    setSelectedEventId(eventId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleEventBooking = async (data) => {
    if (!selectedEventId) {
      console.error("No se ha seleccionado ningún evento.");
      return;
    }

    console.log({
      eventId: selectedEventId,
      ...data,
    });
  };

  return (
    <div css={container}>
      {events.map((item) => {
        const { available } = item;

        const date = new Date(item.date);
        const hour = new Date(date).getUTCHours();

        return (
          <div key={item._id} css={timeSlot}>
            <span css={timeLabel}>{`${hour}:00`}</span>
            <div css={eventButtonContainer}>
              <div onClick={() => openModal(item._id)} css={eventButton}>
                {available ? (
                  <span css={eventButtonText}>Evento Disponible</span>
                ) : (
                  <span css={eventButtonText}>Evento apartado</span>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <ModalReservation
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleEventBooking={handleEventBooking}
      />
    </div>
  );
};

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const timeSlot = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-bottom: 1px solid ${colors.violet};
  height: 70px;
  width: 90%;
  align-items: center;
`;

const timeLabel = css`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.purple};
`;

const eventButtonContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const eventButton = css`
  width: 200px;
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
  font-family: "Open Sans";
  font-size: 12px;
  color: ${colors.pink};
  font-weight: bold;
  cursor: pointer;
`;

export default Schedule;
