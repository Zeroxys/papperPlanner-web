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
    <div css={styles.content}>
      <div css={styles.daysContainer}>
        {daysArray.map((item, index) => (
          <button
            key={index}
            disabled={!item.disable}
            css={styles.daysButton(item, selectedDate)}
            onClick={() => handleSelectedDay(item)}
          >
            <span>{item.day.split(",")[0]}</span>
            <span>{item.date}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  content: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 95%;
    // height: 70px;
    padding: 10px 0 0 10px;
  `,
  daysContainer: css`
    display: flex;
    flex: 1;
    overflow: scroll;
  `,
  daysButton: (item, selectedDate) => css`
    padding: 10px;
    margin: 5px;
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
  `,
};

export default DaysOfMonth;
