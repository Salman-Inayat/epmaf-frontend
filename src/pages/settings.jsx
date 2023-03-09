import { useState, useEffect } from "react";

import { Container, Grid, Typography } from "@mui/material";
import axiosInstance from "../axiosInstance";
import SettingsTab from "../components/tabs/settingsPageTabs";
import toast, { Toaster } from "react-hot-toast";

function Settings() {
  document.title = "EPMCAF | Settings";
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

  const [encryptedPasswords, setEncryptedPasswords] = useState([]);

  const [encryptPasswords, setEncryptPasswords] = useState({
    EPMCloudPassword: {
      title: "EPM Cloud",
      value: "",
      fileName: "",
    },
    SFTPServerPassword: {
      title: "SFTP Server",
      value: "",
    },
    SMTPServerPassword: {
      title: "SMTP Server",
      value: "",
    },
    SQLServerPassword: {
      title: "SQL Server",
      value: "",
    },
  });

  const [loading, setLoading] = useState(false);

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

      setEncryptedPasswords(response.data.encryptedPasswords);
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

  const handleCategorySave = async (category, data) => {
    try {
      await axiosInstance.put("/settings/update", {
        category,
        data: JSON.stringify(data),
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

    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/settings/encrypt-password",
        {
          key,
          value,
          ...(fileName !== "" && { fileName }),
        },
        {
          timeout: 60000,
        }
      );

      toast.success("Password encrypted successfully", {
        style: {
          fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
        },
      });

      fetchEncryptedPasswords();
    } catch (error) {
      console.log(error);
      toast.error("There was an error encrypting the password", {
        style: {
          fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
        },
      });
    } finally {
      setLoading(false);
      setEncryptPasswords({
        ...encryptPasswords,
        [key]: {
          ...encryptPasswords[key],
          value: "",
          fileName: "",
        },
      });
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
            handleSetSettings={handleSetSettings}
            settings={settings}
            encryptPasswords={encryptPasswords}
            handleEncryptPassword={handleEncryptPassword}
            encryptedPasswords={encryptedPasswords}
            handleSetEncryptPassword={handleSetEncryptPassword}
            loading={loading}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Settings;
