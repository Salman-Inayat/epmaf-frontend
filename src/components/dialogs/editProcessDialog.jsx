import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";

const EditProcessDialog = ({
  editProcess,
  handleEditDialogClose,
  handleProcessEdit,
  handleEditProcessNameChange,
}) => {
  return (
    <Dialog
      open={editProcess.open}
      onClose={handleEditDialogClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: "40vw",
        },
      }}
    >
      <DialogTitle>Edit Process</DialogTitle>
      <DialogContent>
        <DialogContentText>Please enter the process name.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          type="text"
          fullWidth
          variant="outlined"
          value={editProcess.newTitle || ""}
          onChange={(e) => {
            handleEditProcessNameChange(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {`${editProcess.oldTitle.split("_").shift()}_`}
              </InputAdornment>
            ),
          }}
          error={editProcess.error ? true : false}
          helperText={editProcess.error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditDialogClose}>Cancel</Button>
        <Button
          onClick={() => {
            handleProcessEdit();
          }}
          disabled={
            editProcess.error === "" &&
            editProcess.newTitle !== "" &&
            editProcess.newTitle !==
              editProcess.oldTitle.split("_").slice(1).join("_")
              ? false
              : true
          }
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProcessDialog;
