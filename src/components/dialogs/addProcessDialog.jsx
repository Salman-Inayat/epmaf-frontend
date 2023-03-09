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

const AddProcessDialog = ({
  addProcess,
  handleClose,
  handleAddProcess,
  generateNextProcessNumber,
  handleProcessNameChange,
}) => {
  return (
    <Dialog
      open={addProcess.open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: "40vw",
        },
      }}
    >
      <DialogTitle>Add Process</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter a new process name below:</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          type="text"
          fullWidth
          variant="outlined"
          value={addProcess.title || ""}
          onChange={(e) => {
            handleProcessNameChange(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {`${generateNextProcessNumber()}_`}
              </InputAdornment>
            ),
          }}
          error={addProcess.error ? true : false}
          helperText={addProcess.error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            handleAddProcess();
          }}
          disabled={
            addProcess.error === "" && addProcess.title !== "" ? false : true
          }
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProcessDialog;
