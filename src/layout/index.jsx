import React, { useContext } from "react";
import { Grid, Button, Box, CardContent, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";

import { Home, Settings } from "@mui/icons-material";

import { Context } from "../App";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const { appIcon } = useContext(Context);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Grid
        item
        xs={12}
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
        {/* <Link
          to="/"
          style={{
            fontSize: "1.2rem",
            textDecoration: "none",
            color: "primary.main",
            fontFamily: "Roboto",
          }}
        >
          <Home />
        </Link> */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: "1rem",
          }}
        >
          <img
            src={appIcon}
            alt="logo"
            style={{
              width: 50,
              height: 50,
              borderRadius: 10,
            }}
          />
          <Typography variant="h5">EPMAF</Typography>
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
          {/* <Settings /> */}
          Settings
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          height: "90vh",
        }}
      >
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Layout;
