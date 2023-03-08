import React from "react";
import { Grid, Button, Box, CardContent, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";

import { Home, Settings } from "@mui/icons-material";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2} pb={3}>
      <Grid
        item
        xs={12}
        md={12}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
          height: "10vh",
        }}
      >
        <Button
          onClick={() => {
            navigate("/");
          }}
          sx={{
            fontSize: "1.2rem",
            textTransform: "none",
          }}
        >
          Home
        </Button>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: "1rem",
          }}
        >
          <Typography variant="h5">EPMCAF</Typography>
        </Box>
        <Button
          onClick={() => {
            navigate("/settings");
          }}
          sx={{
            textTransform: "none",
            fontSize: "1.2rem",
          }}
        >
          Settings
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        sx={{
          height: "100%",
        }}
      >
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Layout;
