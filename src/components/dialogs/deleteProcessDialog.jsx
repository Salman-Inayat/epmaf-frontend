import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const DeleteProcessDialog = ({
  deleteProcess,
  handleDeleteDialogClose,
  handleProcessDelete,
}) => {
  return (
    <Dialog open={deleteProcess.open} onClose={handleDeleteDialogClose}>
      <DialogTitle>Delete Process</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the process {deleteProcess.title}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteDialogClose}>Cancel</Button>
        <Button
          onClick={() => {
            handleProcessDelete(deleteProcess.title);
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProcessDialog;
