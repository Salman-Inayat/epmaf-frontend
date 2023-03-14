import React, { useContext } from "react";
import {
  Grid,
  Typography,
  TextField,
  Stack,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { HexColorPicker } from "react-colorful";
import { Context } from "../../../App";
import toast from "react-hot-toast";

function AppSettingsTab() {
  const { updateAppNameSettings, appNameSettings } = useContext(Context);

  const [appSettings, setAppSettings] = React.useState({
    applicationName: appNameSettings.applicationName,
    applicationNameFontSize: appNameSettings.fontSize,
    applicationNameFontColor: appNameSettings.fontColor,
    error: "",
  });

  const handleAppSettings = (e) => {
    setAppSettings({ ...appSettings, [e.target.name]: e.target.value });
  };

  const saveAppSettings = async () => {
    if (appSettings.applicationName === "") {
      toast.error("Please enter a name for the application!", {
        style: {
          fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
        },
      });

      return;
    }

    updateAppNameSettings(appSettings);
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={12} sm={12}>
        <Grid container spacing={2} display="flex" alignItems="center">
          <Grid item md={4} sm={6}>
            <TextField
              fullWidth
              size="small"
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter New Application Name"
              label="Application Header"
              value={appSettings.applicationName}
              onChange={handleAppSettings}
              name="applicationName"
            />
          </Grid>
          <Grid item md={3} sm={6}>
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Font Size
              </InputLabel>
              <Select
                fullWidth
                size="small"
                value={appSettings.applicationNameFontSize}
                onChange={handleAppSettings}
                name="applicationNameFontSize"
                label="Font Size"
              >
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={35}>35</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={45}>45</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={3} sm={6}>
            <HexColorPicker
              color={appSettings.applicationNameFontColor}
              onChange={(color) => {
                setAppSettings({
                  ...appSettings,
                  applicationNameFontColor: color,
                });
              }}
            />
          </Grid>
          <Grid item md={2} sm={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                saveAppSettings();
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AppSettingsTab;
