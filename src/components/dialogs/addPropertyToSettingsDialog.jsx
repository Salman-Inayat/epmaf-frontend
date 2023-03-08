import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

const AddPropertyToSettingsDialog = ({
  addProperty,
  handleSetAddProperty,
  handleClose,
  handleAddNewProperty,
}) => {
  return (
    <Dialog
      open={addProperty.mode}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add a New Variable</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a new variable, enter the variable name and its value below:
        </DialogContentText>
        <TextField
          margin="dense"
          id="name"
          label="Variable Name"
          type="text"
          fullWidth
          value={addProperty.key || ""}
          onChange={(e) => {
            handleSetAddProperty("key", e.target.value);
          }}
        />
        <TextField
          margin="dense"
          id="value"
          label="Variable Value"
          type="text"
          fullWidth
          value={addProperty.value || ""}
          onChange={(e) => {
            handleSetAddProperty("value", e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            handleAddNewProperty();
          }}
          disabled={addProperty.key === "" || addProperty.value === ""}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPropertyToSettingsDialog;
