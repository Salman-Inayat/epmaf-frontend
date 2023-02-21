import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { Grid, Container, Stack, Button, Typography } from "@mui/material";

import AddProcessDialog from "../components/dialogs/addProcessDialog";
import EditProcessDialog from "../components/dialogs/editProcessDialog";
import DeleteProcessDialog from "../components/dialogs/deleteProcessDialog";
import ProcessesTable from "../components/tables/processesTable";

function Processes() {
  const [processes, setProcesses] = useState([]);

  const [addProcess, setAddProcess] = useState({
    open: false,
    title: "",
    error: "",
  });

  const [editProcess, setEditProcess] = useState({
    open: false,
    oldTitle: "",
    newTitle: "",
    error: "",
  });

  const [deleteProcess, setDeleteProcess] = useState({
    open: false,
    title: "",
  });

  useEffect(() => {
    fetchProcesses();
  }, []);

  const fetchProcesses = async () => {
    try {
      const response = await axiosInstance.get("process-maintenance");
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

  const handleEditProcessNameChange = (value) => {
    let newValue = value.replace(" ", "_");

    // the process name should not exceed 56 characters
    if (newValue.length > 56) {
      setEditProcess({
        ...editProcess,
        newTitle: newValue.slice(0, 56),
        error: "Process name should not exceed 56 characters",
      });
      return;
    } else {
      setEditProcess({
        ...editProcess,
        newTitle: newValue,
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
      fetchProcesses();
      setAddProcess({
        open: false,
        title: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetProcessEdit = (process) => {
    setEditProcess({
      open: true,
      oldTitle: process,
      newTitle: process.split("_").slice(1).join("_"),
    });
  };

  const handleSetProcessDelete = (process) => {
    setDeleteProcess({
      open: true,
      title: process,
    });
  };

  const handleProcessEdit = async () => {
    let newProcess = `${editProcess.oldTitle.split("_")[0]}_${
      editProcess.newTitle
    }`;

    // if the new process starts or ends with an underscore, remove it
    if (newProcess.startsWith("_")) {
      newProcess = newProcess.slice(1);
    }

    if (newProcess.endsWith("_")) {
      newProcess = newProcess.slice(0, -1);
    }

    try {
      await axiosInstance.post("process-maintenance/edit-process", {
        oldTitle: editProcess.oldTitle,
        newTitle: newProcess,
      });

      fetchProcesses();
      setEditProcess({
        open: false,
        oldTitle: "",
        newTitle: "",
        error: "",
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
      fetchProcesses();
      handleDeleteDialogClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteDialogClose = () => {
    setDeleteProcess({ open: false, title: "" });
  };

  const handleEditDialogClose = () => {
    setEditProcess({
      open: false,
      oldTitle: "",
      newTitle: "",
      error: "",
    });
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12} mt={5}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" component="h1">
              Processes
            </Typography>
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
          <ProcessesTable
            processes={processes}
            handleSetProcessEdit={handleSetProcessEdit}
            handleSetProcessDelete={handleSetProcessDelete}
          />
        </Grid>
      </Grid>

      <AddProcessDialog
        addProcess={addProcess}
        handleClose={() => setAddProcess({ open: false })}
        handleAddProcess={handleAddProcess}
        generateNextProcessNumber={generateNextProcessNumber}
        handleProcessNameChange={handleProcessNameChange}
      />

      <EditProcessDialog
        editProcess={editProcess}
        handleEditDialogClose={handleEditDialogClose}
        handleProcessEdit={handleProcessEdit}
        handleEditProcessNameChange={handleEditProcessNameChange}
      />

      <DeleteProcessDialog
        deleteProcess={deleteProcess}
        handleDeleteDialogClose={handleDeleteDialogClose}
        handleProcessDelete={handleProcessDelete}
      />
    </Container>
  );
}

export default Processes;
