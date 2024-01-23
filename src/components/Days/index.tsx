import React, { useState } from "react";
import { css } from "@emotion/react";
import colors from "../../utils/colors";

const DaysOfMonth = () => {
  const months = {
    January: {
      daysOfWeekAvailables: {
        Sunday: true,
        Monday: false,
        Tuesday: true,
        Wednesday: true,
        Thursday: true,
        Friday: false,
        Saturday: true,
      },
    },
  };

  const calendarMonth = "January";

  const monthConfiguration = months[calendarMonth];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate();
  const [selectedDate, setSelectedDate] = useState(currentDay);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const { daysOfWeekAvailables } = monthConfiguration;
  const daysArray = [];

  for (let day = currentDay; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    // const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
    const dayOfWeek = date.toLocaleString("es-ES", { weekday: "short" });
    const currentDay = dayOfWeek.split(",")[0];
    daysArray.push({
      day: dayOfWeek,
      date: day,
      disable: daysOfWeekAvailables[currentDay],
    });
  }

  const handleSelectedDay = ({ date }) => {
    setSelectedDate(date);
  };

  return (
    <div
      css={css`
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      `}
    >
      <div
        css={css`
          display: flex;
        `}
      >
        {daysArray.map((item, index) => (
          <button
            key={index}
            disabled={!item.disable}
            css={css`
              padding: 10px;
              margin: 5px;
              border: 1px solid gray;
              border-radius: 5px;
              width: 60px;
              height: 50px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              background-color: ${!item.disable
                ? "gray"
                : item.date === selectedDate
                ? colors.pink
                : colors.purple};
              color: ${colors.white};
              font-size: 18px;
              font-weight: bold;
              cursor: ${!item.disable ? "not-allowed" : "pointer"};
              &:hover {
                background-color: ${item.disable ? "pink" : ""};
              }
            `}
            onClick={() => handleSelectedDay(item)}
          >
            <span
              css={css`
                font-weight: bold;
              `}
            >
              {item.day.split(",")[0]}
            </span>
            <span>{item.date}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DaysOfMonth;
