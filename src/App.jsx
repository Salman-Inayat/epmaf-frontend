import Router from "./routes";
import { useContext, createContext, useState, useEffect } from "react";

import axiosInstance from "./axiosInstance";

export const Context = createContext();

export default function App() {
  const [appIcon, setAppIcon] = useState(null);

  useEffect(() => {
    fetchAppIcon();
  }, []);

  const fetchAppIcon = async () => {
    try {
      const response = await axiosInstance.get("/settings/application-icon");
      setAppIcon(response.data.iconPath);
    } catch (error) {
      console.log(error);
    }
  };

  const updateAppIcon = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axiosInstance.post(
        "/settings/update-application-icon",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAppIcon(response.data.iconPath);
      fetchAppIcon();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Context.Provider
      value={{
        appIcon,
        updateAppIcon,
      }}
    >
      <Router />
    </Context.Provider>
  );
}
