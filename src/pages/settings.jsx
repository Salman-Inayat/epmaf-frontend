import { useState, useEffect, useContext } from "react";

import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axiosInstance from "../axiosInstance";
import { Context } from "../App";
import AddPropertyToSettingsDialog from "../components/dialogs/addPropertyToSettingsDialog";
import axios from "axios";

function Settings() {
  const { updateAppIcon } = useContext(Context);

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

  const [encryptedPasswords, setEcryptedPasswords] = useState([]);

  const [encryptPasswords, setEncryptPassword] = useState([
    {
      key: "SQL",
      value: "",
    },
    {
      key: "SMTP",
      value: "",
    },
    {
      key: "SFTP",
      value: "",
    },
    {
      key: "EPM",
      value: "",
    },
  ]);

  // const passwords = [
  //   {
  //     key: "SQL",
  //     value: "",
  //   },
  //   {
  //     key: "SMTP",
  //     value: "",
  //   },
  //   {
  //     key: "SFTP",
  //     value: "",
  //   },
  //   {
  //     key: "EPM",
  //     value: "",
  //   },
  // ];
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

      console.log(response.data);

      setEcryptedPasswords(response.data.passwords);
    } catch (error) {
      console.error(error);
    }
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

  const updateApplicationIcon = async (e) => {
    await updateAppIcon(applicationIcon.file);

    setApplicationIcon({
      file: null,
      url: null,
    });
  };

  const renderSettingsByCategory = () => {
    return Object.keys(settings).map((key) => {
      return (
        <Grid item xs={12} md={12} key={key}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Typography variant="h5">{key}</Typography>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  {editMode.category === key && editMode.mode ? (
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleCategorySave(settings[key]);
                      }}
                    >
                      Save
                    </Button>
                  ) : null}
                  <Button
                    variant="contained"
                    onClick={() => {
                      setEditMode({
                        category: key,
                        mode: !editMode.mode,
                      });
                    }}
                  >
                    {editMode.category === key && editMode.mode
                      ? "Cancel"
                      : "Edit"}
                  </Button>
                  {!editMode.mode && (
                    <Button
                      variant="contained"
                      onClick={() => {
                        setAddProperty({
                          ...addProperty,
                          category: key,
                          mode: !addProperty.mode,
                          precedent: Object.keys(settings[key]).pop(),
                        });
                      }}
                    >
                      Add
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={2}>
                {renderSettingsByCategoryItem(key)}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    });
  };

  const renderSettingsByCategoryItem = (category) => {
    return Object.keys(settings[category]).map((key) => {
      return (
        <Grid item xs={12} md={12} key={key}>
          <Grid
            container
            spacing={2}
            key={key}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid item xs={4} md={4}>
              <Typography variant="body1">{key}</Typography>
            </Grid>
            <Grid item xs={8} md={8}>
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={settings[category][key]}
                disabled={
                  editMode.category === category && editMode.mode ? false : true
                }
                onChange={(e) => {
                  setSettings({
                    ...settings,
                    [category]: {
                      ...settings[category],
                      [key]: e.target.value,
                    },
                  });
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      );
    });
  };

  const handleSetAddProperty = (key, value) => {
    setAddProperty({
      ...addProperty,
      [key]: value,
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

  const renderEncryptedPasswords = () => {
    return (
      <Grid item md={12}>
        <Grid container spacing={2}>
          {encryptedPasswords.length > 0 &&
            encryptedPasswords.map((password) => {
              return (
                <Grid item md={12}>
                  {Object.entries(password).map(([key, value]) => (
                    <Grid container spacing={2}>
                      <Grid item md={4}>
                        <Typography variant="body1">{key}</Typography>
                      </Grid>
                      <Grid item md={8}>
                        <Typography
                          variant="body1"
                          sx={{
                            wordBreak: "break-all",
                          }}
                        >
                          {value}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    );
  };

  const renderEncryptPasswordSection = () => {
    return (
      <Grid item md={12}>
        <Grid container spacing={2}>
          {encryptPasswords.map((password) => {
            return (
              <Grid item md={12}>
                <Grid container spacing={2}>
                  <Grid item md={4}>
                    <Typography variant="body1">{password.key}</Typography>
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      value={password.value}
                      onChange={() => {
                        setEncryptPassword((prev) => {
                          if (prev.key === password.key) {
                            return [
                              ...prev,
                              {
                                ...prev.key,
                                value: e.target.value,
                              },
                            ];
                          }
                        });
                      }}
                    />
                  </Grid>
                  <Grid item md={2}>
                    <Button>Encrypt</Button>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Typography variant="h4">Settings</Typography>
        </Grid>
        {/* <Grid item xs={12} md={12} my={3}>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Typography variant="h5">Application Icon</Typography>
            <Button variant="contained" component="label">
              Upload icon
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(e) => {
                  setApplicationIcon({
                    file: e.target.files[0],
                    url: URL.createObjectURL(e.target.files[0]),
                  });
                }}
              />
            </Button>
          </Stack>
          {applicationIcon.url && (
            <Stack
              direction="column"
              spacing={2}
              mt={2}
              justifyContent="center"
              alignItems="center"
            >
              <img
                src={applicationIcon.url}
                alt="application icon"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                }}
              />
              <Button variant="contained" onClick={updateApplicationIcon}>
                Save
              </Button>
            </Stack>
          )}
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid container spacing={5}>
            {renderSettingsByCategory()}
          </Grid>
        </Grid> */}
        <Grid item md={12} xs={12}>
          <Grid container spacing={4}>
            <Grid item md={12}>
              <Typography variant="h5">Encrypted passwords</Typography>
            </Grid>
            <Grid item md={12}>
              {renderEncryptedPasswords()}
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12} xs={12}>
          <Grid container spacing={4}>
            <Grid item md={12}>
              <Typography variant="h5">Encrypt the passwords</Typography>
            </Grid>
            <Grid item md={12}>
              {renderEncryptPasswordSection()}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <AddPropertyToSettingsDialog
        addProperty={addProperty}
        handleSetAddProperty={handleSetAddProperty}
        handleAddNewProperty={handleAddNewProperty}
        handleClose={handleClose}
      />
    </Container>
  );
}

export default Settings;
