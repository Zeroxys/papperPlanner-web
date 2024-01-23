import React, { useEffect } from "react";
import { css } from "@emotion/react";
import Header from "../components/Header";
import DaysOfMonth from "../components/Days";
import Schedule from "../components/Schedule";
import createSocket from "../utils/socket";

const containerStyles = css`
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const IndexPage = () => {
  useEffect(() => {
    const socket = createSocket("123123123");
    socket.emit("registerWeb", "webClientId");

    // Escuchar mensajes desde React Native
    socket.on("mensajeDesdeReactNative", (datos) => {
      console.log("Mensaje desde React Native:", datos);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleEnviarMensaje = () => {
    const socket = createSocket("123123123");
    socket.emit("enviarMensajeApp", {
      mensaje: "Mensaje desde la webapp",
      receptor: "reactNativeClientId",
    });
  };

  return (
    <div css={containerStyles}>
      <div>
        <button onClick={handleEnviarMensaje}>
          Enviar Mensaje al Servidor
        </button>
        <Header title={"Calendario"} />
        <DaysOfMonth />
        <Schedule />
      </div>
    </div>
  );
};

export default IndexPage;
