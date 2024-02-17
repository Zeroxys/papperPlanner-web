import React, { useState } from "react";
import { css } from "@emotion/react";
import colors from "../../../utils/colors";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

const DaysOfMonth = ({ onSelectDay, daysOfWeekAvailables }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate();
  const [selectedDate, setSelectedDate] = useState(currentDay);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const daysArray = [];

  for (let day = currentDay; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const dayOfWeekEn = date.toLocaleString("en-EN", { weekday: "long" });
    const dayOfWeek = date.toLocaleString("es-ES", { weekday: "short" });

    if (daysOfWeekAvailables) {
      daysArray.push({
        day: dayOfWeek,
        date: day,
        isActive: daysOfWeekAvailables[dayOfWeekEn],
        isSelected: day === selectedDate,
      });
    }
  }

  const handleSelectedDay = (item) => {
    if (item.isActive) {
      onSelectDay(item);
      setSelectedDate(item.date);
    }
  };

  return (
    <div css={styles.content}>
      <div css={styles.daysContainer}>
        {daysArray.map((item, index) => {
          return (
            <Tooltip
              key={index}
              title={
                item.isActive ? "" : "Actualmente la fecha no esta disponible"
              }
              arrow
            >
              <div
                css={styles.daysButton(item)}
                onClick={() => handleSelectedDay(item)}
              >
                <span>{item.day.split(",")[0]}</span>
                <span>{item.date}</span>
              </div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  content: css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0 0 10px;
    height: 80px;
  `,
  daysContainer: css`
    width: 30px !important;
    padding-left: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 100px;
    overflow-x: auto;

    &::webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    &::webkit-scrollbar-track {
      background: ${colors.white};
    }
    &::webkit-scrollbar-thumb {
      background-color: ${colors.purple};
      border-radius: 4px;
    }
  `,
  daysButton: ({ isSelected, isActive }) => css`
    position: relative;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50px;
    margin: 5px;
    border-radius: 8px;
    color: ${colors.white};
    font-size: 16px;
    background-color: ${isSelected
      ? colors.purple
      : isActive
      ? colors.darkpink
      : "lightgray"};
    font-weight: bold;
    cursor: ${isActive ? "pointer" : "not-allowed"};
    transition: 0.2s ease;

    &:hover {
      padding: 7px;
      background-color: ${isSelected
        ? colors.purple
        : isActive
        ? colors.pink
        : colors.gray};
    }
  `,
};

export default DaysOfMonth;
