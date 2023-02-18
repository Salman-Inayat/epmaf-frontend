import { Grid, Card, Box, CardContent, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
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
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "10vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <img src="/vite.svg" alt="logo" />
          <Typography variant="h6">Title</Typography>
        </Box>
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
