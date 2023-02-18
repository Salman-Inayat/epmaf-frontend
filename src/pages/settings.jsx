import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  TextField,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import axiosInstance from "../axiosInstance";

function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({});
  const [editMode, setEditMode] = useState({
    category: "",
    mode: false,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const response = await axiosInstance.get("/settings");
    setSettings(response.data.settings);
    console.log(response.data.settings);
  };

  const handleCategorySave = (category, data) => {
    try {
      const response = axiosInstance.put("/settings/update", {
        category,
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
                        handleCategorySave(key, settings[key]);
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
    </Container>
  );
}

export default Settings;
