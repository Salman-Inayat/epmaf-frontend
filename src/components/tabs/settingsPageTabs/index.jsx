import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import EnvironmentVariablesTab from "./environmentVariablesTab";
import PasswordsTab from "./passwordsTab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SettingsTab = ({
  settings,
  handleSetSettings,

  editMode,
  handleSetEditMode,

  addProperty,
  setAddProperty,

  applicationIcon,

  handleSetApplicationIcon,
  fetchSettings,
  handleCategorySave,

  encryptPasswords,
  handleEncryptPassword,
  encryptedPasswords,
  handleSetEncryptPassword,

  loading,
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Environment variables" {...a11yProps(0)} />
          <Tab label="Passwords" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <EnvironmentVariablesTab
          settings={settings}
          handleSetSettings={handleSetSettings}
          editMode={editMode}
          handleSetEditMode={handleSetEditMode}
          addProperty={addProperty}
          setAddProperty={setAddProperty}
          applicationIcon={applicationIcon}
          handleSetApplicationIcon={handleSetApplicationIcon}
          fetchSettings={fetchSettings}
          handleCategorySave={handleCategorySave}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PasswordsTab
          encryptPasswords={encryptPasswords}
          handleEncryptPassword={handleEncryptPassword}
          encryptedPasswords={encryptedPasswords}
          handleSetEncryptPassword={handleSetEncryptPassword}
          loading={loading}
        />
      </TabPanel>
    </Box>
  );
};

export default SettingsTab;
