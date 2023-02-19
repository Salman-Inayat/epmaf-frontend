import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

const StepsTable = ({ steps, deleteStep }) => {
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    step: "",
  });

  const openDialog = (commandStep) => {
    setDeleteDialog({
      open: true,
      step: commandStep,
    });
  };

  const closeDialog = () => {
    setDeleteDialog({
      open: false,
      step: "",
    });
  };

  const handleDeleteStep = () => {
    deleteStep(deleteDialog.step);
    closeDialog();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Step</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Command</TableCell>
              <TableCell align="left">Enabled</TableCell>
              <TableCell align="left">Continue On Error</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {steps.map((step) => (
              <TableRow
                key={step.commandStep}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {step.commandStep}
                </TableCell>
                <TableCell align="left">{step.commandType}</TableCell>
                <TableCell align="left">{step.commandDescription}</TableCell>
                <TableCell align="left">{step.command}</TableCell>
                <TableCell align="left">{step.commandEnabled}</TableCell>
                <TableCell align="left">
                  {step.commandContinueOnError}
                </TableCell>
                <TableCell align="left">
                  <Stack direction="row" spacing={2}>
                    <DeleteIcon
                      color="error"
                      onClick={() => {
                        openDialog(step.commandStep);
                      }}
                      sx={{
                        cursor: "pointer",
                      }}
                    />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={deleteDialog.open} onClose={closeDialog}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this step?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleDeleteStep}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StepsTable;
