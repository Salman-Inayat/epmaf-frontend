import React, { useContext } from "react";
import {
  Grid,
  Stack,
  Typography,
  Button,
  TextField,
  Container,
} from "@mui/material";
import axiosInstance from "../../../axiosInstance";

import { Context } from "../../../App";

import AddPropertyToSettingsDialog from "../../dialogs/addPropertyToSettingsDialog";

const EnvironmentVariablesTab = ({
  settings,

  editMode,
  handleSetEditMode,

  addProperty,
  setAddProperty,

  applicationIcon,
  handleSetApplicationIcon,

  handleSetSettings,
  fetchSettings,
  handleCategorySave,
}) => {
  const { updateAppIcon } = useContext(Context);

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

    handleSetApplicationIcon(null, null);
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

  const renderSettingsByCategory = () => {
    return Object.keys(settings).map((key) => {
      return (
        <Grid item xs={12} md={12} key={key}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Typography variant="h5">{key}</Typography>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  {editMode?.category === key && editMode?.mode ? (
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleCategorySave(key, settings[key]);
                      }}
                    >
                      Save
                    </Button>
                  ) : null}
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleSetEditMode(key, !editMode.mode);
                    }}
                  >
                    {editMode?.category === key && editMode?.mode
                      ? "Cancel"
                      : "Edit"}
                  </Button>
                  {!editMode?.mode && (
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
                  handleSetSettings(key, e.target.value, category);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      );
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} my={3}>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Typography variant="h5">Logo</Typography>
          <Button variant="contained" component="label">
            Upload logo
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={(e) => {
                handleSetApplicationIcon(
                  e.target.files[0],
                  URL.createObjectURL(e.target.files[0])
                );
              }}
            />
          </Button>
        </Stack>
        {applicationIcon?.url && (
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
      </Grid>
      <AddPropertyToSettingsDialog
        addProperty={addProperty}
        handleSetAddProperty={handleSetAddProperty}
        handleAddNewProperty={handleAddNewProperty}
        handleClose={handleClose}
      />
    </Grid>
  );
};

export default EnvironmentVariablesTab;
