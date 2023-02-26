import { useState, useEffect, useContext } from "react";

import { Container, Grid, Typography } from "@mui/material";
import axiosInstance from "../axiosInstance";
import SettingsTab from "../components/tabs/settingsPageTabs";

function Settings() {
  const [settings, setSettings] = useState({});
  const [editMode, setEditMode] = useState({
    category: "",
    mode: false,
  });

  const [addProperty, setAddProperty] = useState({
    category: "",
    mode: false,
    precedent: "",
    key: "",
    value: "",
  });

  const [applicationIcon, setApplicationIcon] = useState({
    file: null,
    url: null,
  });

  const [encryptedPasswords, setEncryptedPasswords] = useState([]);

  const [encryptPasswords, setEncryptPasswords] = useState({
    SQLServerPassword: {
      value: "",
    },
    SMTPServerPassword: {
      value: "",
    },
    SFTPServerPassword: {
      value: "",
    },
    EPMCloudPassword: {
      value: "",
      fileName: "",
    },
  });

  useEffect(() => {
    fetchSettings();
    fetchEncryptedPasswords();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axiosInstance.get("/settings");
      setSettings(response.data.settings);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEncryptedPasswords = async () => {
    try {
      const response = await axiosInstance.get("/settings/encrypted-passwords");

      setEncryptedPasswords(response.data.passwords);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetSettings = (key, value, category) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value,
      },
    });
  };

  const handleSetEditMode = (category, mode) => {
    setEditMode({
      category,
      mode: mode,
    });
  };

  const handleSetApplicationIcon = (file, url) => {
    setApplicationIcon({
      file,
      url,
    });
  };

  const handleCategorySave = async (data) => {
    try {
      await axiosInstance.put("/settings/update", {
        data,
      });

      setEditMode({
        category: "",
        mode: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNewProperty = async () => {
    try {
      await axiosInstance.put("/settings/add-property", {
        key: addProperty.key,
        value: addProperty.value,
        precedent: addProperty.precedent,
      });

      setAddProperty({
        category: "",
        mode: false,
        precedent: "",
        key: "",
        value: "",
      });

      fetchSettings();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetAddProperty = (key, value) => {
    setAddProperty({
      ...addProperty,
      [key]: value,
    });
  };

  const handleSetEncryptPassword = (key, value, fileName) => {
    setEncryptPasswords({
      ...encryptPasswords,
      [key]: {
        ...encryptPasswords[key],
        // value: fileName!=="" ? "" : value,
        // if there is a file name, then the value is kept using the previous value
        value: fileName !== "" ? encryptPasswords[key].value : value,

        // if the key is EPMCloudPassword, then the fileName is added to the state
        ...(key === "EPMCloudPassword" && { fileName }),
      },
    });
  };

  const handleClose = () => {
    setAddProperty({
      category: "",
      mode: false,
      precedent: "",
      key: "",
      value: "",
    });
  };

  const handleEncryptPassword = async (key, value, fileName) => {
    console.log({ key, value, fileName });
    try {
      await axiosInstance.post("/settings/encrypt-password", {
        key,
        value,
        ...(fileName !== "" && { fileName }),
      });

      // setEncryptPasswords({
      //   ...encryptPasswords,
      //   [key]: {
      //     ...encryptPasswords[key],
      //     value: "",
      //   },
      // });

      // fetchEncryptedPasswords();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Typography variant="h4">Settings</Typography>
        </Grid>

        <Grid item xs={12} md={12}>
          <SettingsTab
            handleSetAddProperty={handleSetAddProperty}
            editMode={editMode}
            handleSetEditMode={handleSetEditMode}
            handleClose={handleClose}
            addProperty={addProperty}
            setAddProperty={setAddProperty}
            handleAddNewProperty={handleAddNewProperty}
            handleCategorySave={handleCategorySave}
            fetchSettings={fetchSettings}
            applicationIcon={applicationIcon}
            handleSetApplicationIcon={handleSetApplicationIcon}
            handleSetSettings={handleSetSettings}
            settings={settings}
            encryptPasswords={encryptPasswords}
            handleEncryptPassword={handleEncryptPassword}
            encryptedPasswords={encryptedPasswords}
            handleSetEncryptPassword={handleSetEncryptPassword}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Settings;
