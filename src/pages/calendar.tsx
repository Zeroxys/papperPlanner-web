import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import Header from "../components/Calendar/Header";
import DaysOfMonth from "../components/Calendar/Days";
import Schedule from "../components/Calendar/Schedule";
import MonthSelector from "../components/Calendar/MonthSelector";
import createSocket from "../utils/socket";
import useApiFetch from "../hooks/apiFetch";
import colors from "../utils/colors";
import NotFound from "../assets/svg/notFound.svg";
import NotFoundCalendar from "../assets/svg/notFoundCalendar.svg";
import { useSelector } from "react-redux";

const Metas = ({ username }) => {
  const API_URL = process.env.GATSBY_HOST_URL;

  const twitterTitle = `${username} - Calendario: Encuentra eventos emocionantes para cada día`;

  const twitterDescription =
    "Explora nuestro calendario interactivo y descubre eventos emocionantes para cada día. ¡No te pierdas ninguna actividad interesante!";

  return (
    <>
      <title>{username} - Calendario</title>

      <meta
        name="description"
        content="Explora nuestro calendario interactivo y descubre eventos emocionantes para cada día. ¡No te pierdas ninguna actividad interesante!"
      />

      <meta
        property="og:title"
        content={`${username} - Calendario: Encuentra eventos emocionantes para cada día`}
      />

      <meta
        property="og:description"
        content="Explora nuestro calendario interactivo y descubre eventos emocionantes para cada día. ¡No te pierdas ninguna actividad interesante!"
      />

      <meta
        property="og:image"
        content="https://i.ibb.co/94NhgBb/Drawing-sketchpad-1.png"
      />

      <meta property="og:url" content={API_URL + "/calendar"} />
      <meta property="og:type" content="website" />

      {/* Las siguientes líneas de metaetiquetas para Open Graph y Twitter están vacías,
          ya que no se proporcionó información específica para ellas.
          Puedes reemplazar los valores de las propiedades "content" según sea necesario. */}

      {/* Metaetiquetas para Open Graph */}
      <meta property="og:title" content={twitterTitle} />
      <meta property="og:description" content={twitterDescription} />
      <meta
        property="og:image"
        content="https://i.ibb.co/94NhgBb/Drawing-sketchpad-1.png"
      />

      {/* Metaetiquetas para Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={API_URL} />
      <meta property="twitter:url" content={API_URL + "/calendar"} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta
        name="twitter:image"
        content="https://i.ibb.co/94NhgBb/Drawing-sketchpad-1.png"
      />
    </>
  );
};

const IndexPage = ({ location }) => {
  const [user, setUser] = useState({});
  const [events, setEvents] = useState([]);
  const [configuration, setConfiguration] = useState({});
  const [notFoundEvents, setNotFoundEvents] = useState(false);
  const [notFoundCalendar, setnotFoundCalendar] = useState(false);
  const [month, setSelectMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );

  const [day, setSelectDay] = useState(new Date().getDate());
  const { fetchApi } = useApiFetch();
  const calendarId = new URLSearchParams(location.search).get("id");
  const { enableBackdrop } = useSelector(({ user }) => user);

  useEffect(() => {
    getCalendar();
  }, [enableBackdrop]);

  useEffect(() => {
    getCalendar();
  }, [month, day]);

  useEffect(() => {
    const socket = socketConfiguration();
    return () => {
      socket.disconnect();
    };
  }, []);

  const getCalendar = async () => {
    const res = await fetchApi("POST", `/calendar-public`, {
      id: calendarId,
      month,
      day,
    });
    if (res.success) {
      setUser(res.user);
      setConfiguration(res.configuration);
      setEvents(res.events);
      if (res.events.length === 0) {
        setNotFoundEvents(true);
      }
    } else {
      setnotFoundCalendar(true);
    }
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
      <div css={styles.calendarContainer}>
        <MonthSelector
          currentMonth={month}
          onSelectMonth={(month) => setSelectMonth(month)}
        />

        <div css={styles.scrollableContent}>
          {events.length > 0 ? (
            <>
              <DaysOfMonth
                daysOfWeekAvailables={configuration.daysOfWeekAvailables}
                onSelectDay={({ date }) => setSelectDay(date)}
              />
              <Schedule
                calendarId={calendarId}
                events={events}
                currentMonth={month}
              />
            </>
          ) : (
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {notFoundEvents && !notFoundCalendar ? (
                <NotFound css={{ width: 300, padding: 0, margin: 0 }} />
              ) : notFoundCalendar ? (
                <NotFoundCalendar css={{ width: 300, padding: 0, margin: 0 }} />
              ) : null}
              <p
                css={{
                  color: colors.purple,
                  fontSize: 22,
                  fontWeight: "bold",
                  position: "absolute",
                  top: 150,
                }}
              >
                {notFoundCalendar
                  ? "Calendario no encontrado."
                  : "El calendario aún no cuenta con eventos disponibles."}
              </p>
            </div>
          )}
        </div>
      </div>
      <div css={styles.footer} />
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
    width: 500px;
    max-width: 500px;
    margin: 0 auto;
    background-color: white;
    height: 100vh;

    @media (max-width: 768px) {
      width: 100%;
    }
  `,

  calendarContainer: css`
    padding-left: 10px;
    padding-right: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 1;
    width: 480px;
    background-color: white;
    text-align: center;

    @media (max-width: 768px) {
      width: 90%;
      padding-left: 5%;
      padding-right: 5%;
    }
  `,

  scrollableContent: css`
    overflow-y: auto;
    max-height: calc(100vh - 200px);
  `,

  footer: css`
    height: 70px;
    z-index: 999;
    background-color: ${colors.purple};
  `,

  errorImage: css`
    width: 200px;
    height: 200px;
  `,
};

export default IndexPage;
export const Head = () => <Metas username={"Miguel Zavala"} />;
