import { Grid, Typography, TextField, Button } from "@mui/material";

const PasswordsTab = ({
  encryptedPasswords,
  encryptPasswords,
  handleEncryptPassword,
  handleSetEncryptPassword,
}) => {
  const renderEncryptedPasswords = () => {
    return (
      <Grid item md={12}>
        <Grid container spacing={2}>
          {encryptedPasswords.length > 0 &&
            encryptedPasswords.map((password) => {
              return (
                <Grid item md={12}>
                  {Object.entries(password).map(([key, value]) => (
                    <Grid container spacing={2}>
                      <Grid item md={4}>
                        <Typography variant="body1">{key}</Typography>
                      </Grid>
                      <Grid item md={8}>
                        <Typography
                          variant="body1"
                          sx={{
                            wordBreak: "break-all",
                          }}
                        >
                          {value}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              );
            })}
        </Grid>
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
                <Grid container spacing={2}>
                  <Grid item md={4}>
                    <Typography variant="body1">{key}</Typography>
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="outlined-basic"
                      variant="outlined"
                      value={value.value}
                      onChange={(e) => {
                        if (e.target.value.includes(" ")) {
                          return;
                        }
                        handleSetEncryptPassword(key, e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    md={2}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      onClick={() => {
                        handleEncryptPassword(key, value.value);
                      }}
                    >
                      Encrypt
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

  return (
    <Grid container spacing={2}>
      <Grid item md={12} xs={12}>
        <Grid container spacing={4}>
          <Grid item md={12}>
            <Typography variant="h5">Encrypted passwords</Typography>
          </Grid>
          <Grid item md={12}>
            {renderEncryptedPasswords()}
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12} xs={12}>
        <Grid container spacing={4}>
          <Grid item md={12}>
            <Typography variant="h5">Encrypt the passwords</Typography>
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
