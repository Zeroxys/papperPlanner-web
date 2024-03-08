import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import Layout from "../components/Layout";
import useApiFetch from "../hooks/apiFetch";
import { navigate } from "gatsby";

const VerifyEmailPage = () => {
  const [, qs] = location.search.split('?')
  const [verify, setVerify] = useState(false)
  const { fetchApi, error } = useApiFetch();
 

  const validate = async () => {
    const res = await fetchApi("POST", "/verifyUser", {
      id: qs.split("=")[1],
    });

    if (res.success) {
      setVerify(true)
    } 
  }
  useEffect(() => {
   if (qs) validate()
  }, [])

  useEffect(() => {
    if (verify) navigate("/login");
  }, [verify])

  return (
    <Layout verified={false}>
      <div css={styles.container}>
        <h1>Validando correo espera un momento...</h1>
      </div>
    </Layout>
  );
};

const styles = {
  container: css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  `,
};

export default VerifyEmailPage;
