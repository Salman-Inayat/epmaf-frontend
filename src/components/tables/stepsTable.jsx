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
import EditIcon from "@mui/icons-material/Edit";

import { useState } from "react";
import EditStepForm from "../form/editStepForm";

const StepsTable = ({ steps, deleteStep, editStep }) => {
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    step: "",
  });

  const [editDialog, setEditDialog] = useState({
    open: false,
    step: {},
  });

  const openEditDialog = (step) => {
    console.log({ step });
    setEditDialog({
      open: true,
      step,
    });
  };

  const closeEditDialog = () => {
    setEditDialog({
      open: false,
      step: {},
    });
  };

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

  const renderCommandEnabled = (commandEnabled) => {
    if (commandEnabled === "True") {
      return "Step enabled";
    }
    if (commandEnabled === "False") {
      return "Step disabled";
    }
    if (commandEnabled.includes("enabled:ifSuccess")) {
      return "Step Enabled If Previous Step Succeeds";
    }
    if (commandEnabled.includes("enabled:ifFail")) {
      return "Step Enabled If Previous Step Fails";
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                }}
              >
                Step
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Type
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Description
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Command
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Enabled
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Continue On Error
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {steps.length > 0 ? (
              steps.map((step) => (
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
                  <TableCell align="left">
                    {renderCommandEnabled(step.commandEnabled)}
                  </TableCell>
                  <TableCell align="left">
                    {step.commandContinueOnError === "True"
                      ? "Continue Process on Error"
                      : "Terminate Process on Error"}
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={2} justifyContent="center">
                      <EditIcon
                        color="primary"
                        sx={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          openEditDialog(step);
                        }}
                      />

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
              ))
            ) : (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  colSpan={7}
                  align="center"
                >
                  No steps found. Add a step to get started.
                </TableCell>
              </TableRow>
            )}
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

      <Dialog open={editDialog.open} onClose={closeEditDialog}>
        <DialogTitle>Edit Step</DialogTitle>
        <DialogContent>
          <EditStepForm
            step={editDialog.step}
            editStep={editStep}
            closeEditDialog={closeEditDialog}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StepsTable;
