import axiosPrivate from "../api/axiosPrivate";
import { refreshInstance } from "../api/auth";
import useAuthCxt from "./useAuthCxt";
import { useEffect, useRef } from "react";

function useAxiosPrivate() {
  const { auth, setAuth } = useAuthCxt();
  const refreshPromise = useRef(null);

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"] && auth?.access_token) {
          config.headers["Authorization"] = `Bearer ${auth.access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const previousRequest = error?.config;
        console.log(error.response.data);
        if (
          error?.response?.status === 403 &&
          error.response?.data?.detail === "Invalid or expired token" &&
          !previousRequest?._retry
        ) {
          console.log("entered the if state");
          previousRequest._retry = true;

          if (!refreshPromise.current) {
            refreshPromise.current = refreshInstance
              .post("/", { withCredentials: true })
              .then((response) => {
                const newToken = response.data.access_token;
                setAuth((prev) => ({ ...prev, access_token: newToken }));
                return newToken;
              })
              .catch((err) => {
                setAuth({});
                throw err;
              })
              .finally(() => {
                refreshPromise.current = null;
              });
          }

          try {
            const newAccessToken = await refreshPromise.current;
            previousRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return axiosPrivate(previousRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseInterceptor);
      axiosPrivate.interceptors.request.eject(requestInterceptor);
    };
  }, [auth, setAuth]);

  return axiosPrivate;
}

export default useAxiosPrivate;
