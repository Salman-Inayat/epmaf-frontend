import Router from "./routes";
import { useState, useEffect, useContext, createContext } from "react";

import axiosInstance from "./axiosInstance";

import toast, { Toaster } from "react-hot-toast";

export const Context = createContext();

export default function App() {
  const [appNameSettings, setAppNameSettings] = useState({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axiosInstance.get("/settings/get-app-name");

      setAppNameSettings(response.data.settings);
    } catch (error) {
      console.error(error);
    }
  };

  const updateAppNameSettings = async (appSettings) => {
    try {
      const response = await axiosInstance.post("/settings/update-app-name", {
        appSettings,
      });
      toast.success("Settings saved successfully", {
        style: {
          fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
        },
      });

      fetchSettings();
    } catch (error) {
      console.error({ error });
      toast.error("There was an error saving the settings", {
        style: {
          fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
        },
      });
    }
  };

  return (
    <Context.Provider
      value={{
        appNameSettings,
        updateAppNameSettings,
      }}
    >
      <Router />
      <Toaster position="bottom-center" reverseOrder={false} />
    </Context.Provider>
  );
}
