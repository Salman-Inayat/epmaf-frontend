import {
  Grid,
  Typography,
  TextField,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axiosInstance from "../../../axiosInstance";

import toast, { Toaster } from "react-hot-toast";

const PasswordsTab = ({
  encryptedPasswords,
  encryptPasswords,
  handleEncryptPassword,
  handleSetEncryptPassword,
  loading,
}) => {
  console.log({ encryptedPasswords });
  const renderEncryptedPasswords = () => {
    return (
      <Grid item md={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="center">Password Encrypted</TableCell>
                <TableCell align="left">Last Encryption Date/Time</TableCell>
                <TableCell align="left">File Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {encryptedPasswords.length > 0 ? (
                encryptedPasswords.map((password) => {
                  return (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {password.title}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {password.encrypted ? "Yes" : "No"}
                      </TableCell>
                      <TableCell align="left">
                        {new Date(password.lastEncryptionTime).toLocaleString()}
                      </TableCell>
                      <TableCell align="left">{password.fileName}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row" align="center">
                    No encrypted passwords present
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    );
  };

  const renderEncryptPasswordSection = () => {
    return (
      <Grid item md={12}>
        <Grid container spacing={2}>
          {Object.entries(encryptPasswords).map(([key, value]) => {
            return (
              <Grid item md={12}>
                <Grid container spacing={2} display="flex" alignItems="center">
                  <Grid item md={4}>
                    <Typography variant="body1">{value.title}</Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Stack spacing={2} direction="row" width="100%">
                      <TextField
                        fullWidth
                        size="small"
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Enter New Password"
                        value={value.value}
                        onChange={(e) => {
                          if (e.target.value.includes(" ")) {
                            return;
                          }
                          handleSetEncryptPassword(key, e.target.value, "");
                        }}
                      />

                      {key === "EPMCloudPassword" && (
                        <TextField
                          fullWidth
                          size="small"
                          id="outlined-basic"
                          variant="outlined"
                          value={value.fileName}
                          placeholder="Enter File Name"
                          onChange={(e) => {
                            if (e.target.value.includes(" ")) {
                              return;
                            }
                            handleSetEncryptPassword(key, "", e.target.value);
                          }}
                        />
                      )}
                    </Stack>
                  </Grid>
                  <Grid item md={2}>
                    <Button
                      onClick={() => {
                        // if the key is EPMCloudPassword, then the fileName is passed
                        handleEncryptPassword(
                          key,
                          value.value,
                          key === "EPMCloudPassword" ? value.fileName : ""
                        );
                      }}
                      disabled={loading || value.value === ""}
                      variant="outlined"
                      fullWidth
                    >
                      {loading && value.value !== "" ? (
                        <CircularProgress size={26} />
                      ) : (
                        "Encrypt"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    );
  };

  const handleGenerateInitialEncryptionKeys = async () => {
    try {
      const response = await axiosInstance.post(
        "/settings/generate-initial-encryption-keys"
      );

      console.log({ response });

      toast.success("Generating encryption keys");
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <Grid container spacing={6}>
      <Grid item md={12} xs={12}>
        <Grid container spacing={4}>
          <Grid item md={12}>
            <Typography variant="h5">Encrypted Passwords</Typography>
          </Grid>
          <Grid item md={12}>
            {renderEncryptedPasswords()}
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12} xs={12}>
        <Grid container spacing={4}>
          <Grid item md={12} display="flex" justifyContent="space-between">
            <Typography variant="h5">Encrypt Passwords</Typography>
            <Button
              variant="contained"
              onClick={handleGenerateInitialEncryptionKeys}
            >
              Generate encryption keys
            </Button>
          </Grid>
          <Grid item md={12}>
            {renderEncryptPasswordSection()}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PasswordsTab;
