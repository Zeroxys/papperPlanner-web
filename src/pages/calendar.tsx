import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "../components/Calendar/Header";
import DaysOfMonth from "../components/Calendar/Days";
import Schedule from "../components/Calendar/Schedule";
import MonthSelector from "../components/Calendar/MonthSelector";
import createSocket from "../utils/socket";
import useApiFetch from "../hooks/apiFetch";
import colors from "../utils/colors";

const IndexPage = ({ location }) => {
  // Estados
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [configuration, setConfiguration] = useState({});
  const [month, setSelectMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );
  const [day, setSelectDay] = useState(new Date().getDate());
  const { fetchApi } = useApiFetch();
  const calendarId = new URLSearchParams(location.search).get("id");

  useEffect(() => {
    getCalendar();
  }, [month]);

  useEffect(() => {
    const socket = socketConfiguration();
    return () => {
      socket.disconnect();
    };
  }, []);

  // Funciones auxiliares
  const getCalendar = async () => {
    // setLoading(true);
    const res = await fetchApi("POST", `/calendar-public`, {
      id: calendarId,
      month,
      day,
    });
    if (res.success) {
      setConfiguration(res.configuration);
      setEvents(res.events);
    }
    // setLoading(false);
  };

  const socketConfiguration = () => {
    const socket = createSocket("123123123");
    socket.emit("registerWeb", "webClientId");
    socket.on("mensajeDesdeReactNative", (datos) => {
      console.log("Mensaje desde React Native:", datos);
    });
    return socket;
  };

  return (
    <div css={styles.containerStyles}>
      <Header title={"Calendario"} />
      {loading ? (
        <div css={styles.loaderContainer}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <div css={styles.contentContainerStyles}>
            <div css={styles.monthSelectorContainerStyles}>
              <MonthSelector
                currentMonth={month}
                onSelectMonth={(month) => setSelectMonth(month)}
              />
            </div>
            <div css={styles.infoContainerStyles}>
              <p css={styles.infoItemStyles}>Miguel Angel Zavala Castillo</p>
              <p css={styles.infoItemStyles}>Mar Jonico 221. cp 123123</p>
              <p css={styles.infoItemStyles}>miguelzavalac@gmail.com</p>
            </div>
          </div>
          <div style={styles.daysContainer}>
            <DaysOfMonth
              daysOfWeekAvailables={configuration.daysOfWeekAvailables}
              onSelectDay={({ date }) => setSelectDay(date)}
            />
          </div>
          <div css={styles.scheduleContainerStyles}>
            <Schedule events={events} />
          </div>
        </>
      )}
      <div css={styles.wave}></div>
    </div>
  );
};

const styles = {
  containerStyles: css`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 1;
    width: 40%;
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
    text-align: center;
    height: 100vh;
    z-index: 9;

    @media (max-width: 768px) {
      width: 100%;
    }
  `,
  wave: css`
    width: 100%;
    height: 10%;
    background-color: ${colors.purple};
  `,
  contentContainerStyles: css`
    display: flex;
    padding: 0 20px 0 15px;
    justify-content: space-between;
    align-items: flex-start;
    width: 95%;
    margin-top: 20px;
  `,
  monthSelectorContainerStyles: css`
    width: 40%;
  `,
  daysContainer: css`
    margin-top: 10%;
  `,
  infoContainerStyles: css`
    width: 40%;
  `,
  infoItemStyles: css`
    color: ${colors.purple};
    font-weight: bold;
    padding: 0;
    margin: 5px;
    font-size: 12px;
  `,
  scheduleContainerStyles: css`
    margin-top: 22px;
    height: 60%;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      background: ${colors.white};
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${colors.purple};
      border-radius: 20px;
    }
  `,
};

export default IndexPage;
