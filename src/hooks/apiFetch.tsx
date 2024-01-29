import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBearerInfoAction } from "../redux/actions/authActions";

const useApiFetch = () => {
  const API_URL = process.env.GATSBY_API_URL;
  const dispatch = useDispatch();
  const { bearerToken, refreshToken, userId, bearerInfo } = useSelector(
    ({ auth }) => {
      return auth;
    }
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApi = async (
    method = "GET",
    path = "",
    body = null,
    formData = null
  ) => {
    setLoading(true);

    const headers = {
      "Content-Type": !formData ? "application/json" : "multipart/form-data",
    };

    if (bearerToken) {
      headers["Authorization"] = `Bearer ${bearerToken}`;
    }

    const options = {
      method,
      headers,
      ...(method !== "GET" && { body: body ? JSON.stringify(body) : formData }),
    };

    try {
      if (!refreshToken) {
        const res = await fetch(
          `${process.env.GATSBY_API_URL}${path}`,
          options
        );
        const data = await res.json();

        if (data.sucess) {
          if (!bearerInfo.expirationDate) {
            const res = await fetch(`${API_URL}/auth/refresh-token`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.bearerToken}`,
              },
              body: JSON.stringify({ refreshToken, userId }),
            });
            const response = await res.json();
            console.log("actualizanding el token", response);
            await dispatch(
              setBearerInfoAction({
                token: response.bearerToken,
                info: {
                  createdAt: response.createdAt,
                  expirationDate: response.expirationDate,
                },
              })
            );

            const res1 = await fetch(`${API_URL}${path}`, options);
            const data = await res1.json();
            setLoading(false);
            return data;
          }
        }

        setLoading(false);
        if (!data.succes) setError(data.error);
        return data;
      } else {
        if (!bearerInfo.expirationDate) {
          const res = await fetch(`${API_URL}/auth/refresh-token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify({ refreshToken, userId }),
          });
          const response = await res.json();
          console.log("actualizanding el token", response);
          await dispatch(
            setBearerInfoAction({
              token: response.bearerToken,
              info: {
                createdAt: response.createdAt,
                expirationDate: response.expirationDate,
              },
            })
          );

          const res1 = await fetch(`${API_URL}${path}`, options);
          const data = await res1.json();
          setLoading(false);
          return data;
        } else {
          const res = await fetch(`${API_URL}${path}`, options);
          const data = await res.json();
          setLoading(false);
          return data;
        }
      }
    } catch (e) {
      setLoading(false);
      setError(`Error en la solicitud: ${e}`);
      throw new Error(`Error en la solicitud: ${e}`);
    }
  };

  return { fetchApi, loading, error };
};

export default useApiFetch;
