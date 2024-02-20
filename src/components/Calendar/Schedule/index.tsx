import React, { useState } from "react";
import { css } from "@emotion/react";
import ModalReservation from "../ModalReservation";
import useApiFetch from "../../../hooks/apiFetch";
import { useDispatch } from "react-redux";
import { Tooltip, Alert, AlertTitle } from "@mui/material";
import colors from "../../../utils/colors";

import { enableBackdropAction } from "../../../redux/actions/userActions";

const Schedule = ({ events, calendarId, currentMonth }) => {
  const dispatch = useDispatch();
  const { fetchApi } = useApiFetch();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleEventBooking = async (data) => {
    dispatch(enableBackdropAction(true));
    const res = await fetchApi("POST", `/make-booking`, {
      calendarId,
      month: currentMonth,
      bookingId: selectedEvent._id,
      isBooking: true,
      ...data,
    });

    if (res.success) {
      setAlertMessage(res.message);
      setAlertOpen(true);
    }

    dispatch(enableBackdropAction(false));
  };

  return (
    <div css={container}>
      {alertOpen ?? (
        <Alert severity="success" onClose={() => setAlertOpen(false)}>
          <AlertTitle>Éxito</AlertTitle>
          {alertMessage}
        </Alert>
      )}

      {events.map((item) => {
        const { isBooking } = item;

        const date = new Date(item.date);
        const hour = new Date(date).getUTCHours();

        return (
          <div key={item._id} css={timeSlot}>
            <span css={timeLabel}>{`${hour}:00`}</span>
            <div css={eventButtonContainer}>
              <Tooltip
                placement="top"
                title={isBooking ? "Evento no disponible" : "Evento disponible"}
                arrow
              >
                <div
                  onClick={() => !isBooking && openModal(item)}
                  css={[
                    eventButton(isBooking),
                    isBooking && disabledEventButton,
                  ]}
                >
                  <span css={eventButtonText(isBooking)}>
                    {isBooking ? "Evento Apartado" : "Evento Disponible"}
                  </span>
                </div>
              </Tooltip>
            </div>
          </div>
        );
      })}
      <ModalReservation
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleEventBooking={handleEventBooking}
        selectedEvent={selectedEvent}
      />
    </div>
  );
};

const container = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  // height: 700px;
  width: 100%;
  overflow: auto;
`;

const timeSlot = css`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid ${colors.violet};
  width: 400px;
  padding-top: 10px;
  padding-bottom: 10px;
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

const eventButton = (isBooking) => css`
  width: 200px;
  border: ${isBooking ? "none" : `1px solid ${colors.purple}`};
  border-radius: 20px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

const disabledEventButton = css`
  background-color: ${colors.darkpink};
  color: ${colors.white};
`;

const eventButtonText = (isBooking) => css`
  font-family: "Open Sans";
  font-size: 12px;
  color: ${isBooking ? colors.white : colors.pink};
  font-weight: bold;
  cursor: pointer;
`;

export default Schedule;
