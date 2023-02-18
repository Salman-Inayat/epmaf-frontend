import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { Save } from "@mui/icons-material";

function Settings() {
  const navigate = useNavigate();
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

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const response = await axiosInstance.get("/settings");
    setSettings(response.data.settings);
  };

  const handleCategorySave = (data) => {
    try {
      const response = axiosInstance.put("/settings/update", {
        data,
      });
      console.log(response);

      setEditMode({
        category: "",
        mode: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNewProperty = () => {
    console.log(addProperty);
    try {
      const response = axiosInstance.put("/settings/add-property", {
        key: addProperty.key,
        value: addProperty.value,
        precedent: addProperty.precedent,
      });
      console.log(response);

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

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Typography variant="h4">Settings</Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid container spacing={5}>
            {renderSettingsByCategory()}
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={addProperty.mode}
        onClose={() => {
          setAddProperty({
            category: "",
            mode: false,
          });
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a new property</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new property, please enter the property name and value
            here.
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Property Name"
            type="text"
            fullWidth
            value={addProperty.key || ""}
            onChange={(e) => {
              setAddProperty({
                ...addProperty,
                key: e.target.value,
              });
            }}
          />
          <TextField
            margin="dense"
            id="value"
            label="Property Value"
            type="text"
            fullWidth
            value={addProperty.value || ""}
            onChange={(e) => {
              setAddProperty({
                ...addProperty,
                value: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setAddProperty({
                category: "",
                mode: false,
                precedent: "",
                key: "",
                value: "",
              });
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleAddNewProperty();
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Settings;
