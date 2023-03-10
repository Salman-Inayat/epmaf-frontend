import React from "react";
import {
  Grid,
  Stack,
  Typography,
  Button,
  TextField,
  Container,
  Divider,
} from "@mui/material";
import axiosInstance from "../../../axiosInstance";

import AddPropertyToSettingsDialog from "../../dialogs/addPropertyToSettingsDialog";

const EnvironmentVariablesTab = ({
  settings,

  editMode,
  handleSetEditMode,

  addProperty,
  setAddProperty,

  handleSetSettings,
  fetchSettings,
  handleCategorySave,
}) => {
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
                {!key.includes("Other Global Variables") && (
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
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={2}>
                {renderSettingsByCategoryItem(key)}
              </Grid>
            </Grid>
          </Grid>

          <Divider
            sx={{
              marginTop: "2rem",
            }}
          />
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
