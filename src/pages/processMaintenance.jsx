import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import {
  Grid,
  Container,
  Stack,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";

import { Delete } from "@mui/icons-material";

function Processes() {
  const [processes, setProcesses] = useState([]);

  const [addProcess, setAddProcess] = useState({
    open: false,
    title: "",
    error: "",
  });

  useEffect(() => {
    fetchProcesses();
  }, []);

  const fetchProcesses = async () => {
    try {
      const response = await axiosInstance.get("process-maintenance");
      console.log(response.data);
      setProcesses(response.data.processes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProcessNameChange = (value) => {
    let newValue = value.replace(" ", "_");

    // the process name should not exceed 56 characters
    if (newValue.length > 56) {
      setAddProcess({
        ...addProcess,
        title: newValue.slice(0, 56),
        error: "Process name should not exceed 56 characters",
      });
      return;
    } else {
      setAddProcess({
        ...addProcess,
        title: newValue,
        error: "",
      });
    }
  };

  const generateNextProcessNumber = () => {
    if (processes.length === 0) {
      return "P001";
    }

    const lastProcess = processes[processes.length - 1];
    const lastProcessProcessNumber = lastProcess.split("_")[0];

    const nextProcessNumber = parseInt(lastProcessProcessNumber.slice(1)) + 1;
    const nextProcessNumberString = nextProcessNumber.toString();
    const nextProcessNumberLength = nextProcessNumberString.length;

    if (nextProcessNumberLength === 1) {
      return `P00${nextProcessNumberString}`;
    }

    if (nextProcessNumberLength === 2) {
      return `P0${nextProcessNumberString}`;
    }

    if (nextProcessNumberLength === 3) {
      return `P${nextProcessNumberString}`;
    }

    return "P000";
  };

  const handleAddProcess = async () => {
    const nextProcessNumber = generateNextProcessNumber();
    let newProcess = `${nextProcessNumber}_${addProcess.title}`;

    // if the new process starts or ends with an underscore, remove it
    if (newProcess.startsWith("_")) {
      newProcess = newProcess.slice(1);
    }

    if (newProcess.endsWith("_")) {
      newProcess = newProcess.slice(0, -1);
    }

    try {
      const response = await axiosInstance.post(
        "process-maintenance/add-process",
        {
          title: newProcess,
        }
      );
      console.log(response.data);
      fetchProcesses();
      setAddProcess({
        open: false,
        title: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleProcessDelete = async (process) => {
    try {
      const response = await axiosInstance.delete(
        `process-maintenance/delete-process?title=${process}`
      );
      console.log(response.data);
      fetchProcesses();
    } catch (error) {
      console.log(error);
    }
  };

  const renderProcesses = () => {
    return processes.map((process, index) => {
      return (
        <Grid item xs={12} md={12} lg={12} key={process}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1">{process}</Typography>
            <Delete
              color="error"
              fontSize="medium"
              onClick={() => {
                handleProcessDelete(process);
              }}
              sx={{
                cursor: "pointer",
              }}
            />
          </Stack>
        </Grid>
      );
    });
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h4">Process Maintenance</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setAddProcess({
                  open: true,
                  title: "",
                });
              }}
            >
              Add Process
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid container spacing={2}>
            {renderProcesses()}
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        open={addProcess.open}
        onClose={() => setAddProcess({ open: false })}
      >
        <DialogTitle>Add Process</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter the process name.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Process Name"
            type="text"
            fullWidth
            variant="standard"
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
          <Button onClick={() => setAddProcess({ open: false })}>Cancel</Button>
          <Button
            onClick={() => {
              handleAddProcess();
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Processes;
