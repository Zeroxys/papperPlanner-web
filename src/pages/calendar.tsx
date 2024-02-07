import React, { useEffect } from "react";
import { css } from "@emotion/react";
import Header from "../components/Header";
import DaysOfMonth from "../components/Days";
import Schedule from "../components/Schedule";
import createSocket from "../utils/socket";
import Layout from "../components/Layout";

const IndexPage = () => {
  useEffect(() => {
    const socket = socketConfiguration();
    return () => {
      socket.disconnect();
    };
  }, []);

  const socketConfiguration = () => {
    const socket = createSocket("123123123");
    socket.emit("registerWeb", "webClientId");

    // Escuchar mensajes desde la app
    socket.on("mensajeDesdeReactNative", (datos) => {
      console.log("Mensaje desde React Native:", datos);
    });

    return socket;
  };

  const handleEnviarMensaje = () => {
    const socket = createSocket("123123123");
    socket.emit("enviarMensajeApp", {
      mensaje: "Mensaje desde la webapp [Soy native :v]",
      receptor: "reactNativeClientId",
    });
  };

  return (
    <Layout>
      <div css={containerStyles}>
        <Header title={"Calendario"} />
        <DaysOfMonth />
        <Schedule />
        <div>
          <button onClick={handleEnviarMensaje}>
            Enviar Mensaje al Servidor
          </button>
        </div>
      </div>
    </Layout>
  );
};

const containerStyles = css`
  width: 60%;
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  text-align: center;
  margin-top: 3%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default IndexPage;
