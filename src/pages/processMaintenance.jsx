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
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";

function Processes() {
  const navigate = useNavigate();

  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);

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

  const handleProcessEdit = async () => {
    console.log(editProcess);
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
      console.log(response.data);
      fetchProcesses();
      handleDeleteDialogClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderProcesses = () => {
    // return processes.map((process, index) => {
    //   return (
    //     <Grid item xs={12} md={12} lg={12} key={process}>
    //       <Paper sx={{ p: 2, mb: 2 }} elevation={2}>
    //         <Stack
    //           direction="row"
    //           spacing={2}
    //           justifyContent="space-between"
    //           alignItems="center"
    //         >
    //           <Typography
    //             variant="body1"
    //             onClick={() => {
    //               navigate(`/process/${process}`);
    //             }}
    //             sx={{
    //               cursor: "pointer",
    //             }}
    //           >
    //             {process}
    //           </Typography>
    //           <Stack direction="row" spacing={2}>
    //             <Edit
    //               color="primary"
    //               fontSize="medium"
    //               sx={{
    //                 cursor: "pointer",
    //               }}
    //               onClick={() => {
    //                 setEditProcess({
    //                   open: true,
    //                   oldTitle: process,
    //                   newTitle: process.split("_").slice(1).join("_"),
    //                 });
    //               }}
    //             />
    //             <Delete
    //               color="error"
    //               fontSize="medium"
    //               onClick={() => {
    //                 setDeleteProcess({
    //                   open: true,
    //                   title: process,
    //                 });
    //               }}
    //               sx={{
    //                 cursor: "pointer",
    //               }}
    //             />
    //           </Stack>
    //         </Stack>
    //       </Paper>
    //     </Grid>
    //   );
    // });

    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, processes.length - page * rowsPerPage);

    return (
      <Paper sx={{ width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="body1" fontWeight={600}>
                    No
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontWeight={600}>
                    Title
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1" fontWeight={600}>
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {processes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((process, index) => (
                  <TableRow
                    key={process}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography variant="body1">{index + 1}</Typography>
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <Typography
                        variant="body1"
                        onClick={() => {
                          navigate(`/process/${process}`);
                        }}
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        {process}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                      >
                        <Edit
                          color="primary"
                          fontSize="medium"
                          sx={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setEditProcess({
                              open: true,
                              oldTitle: process,
                              newTitle: process.split("_").slice(1).join("_"),
                            });
                          }}
                        />
                        <Delete
                          color="error"
                          fontSize="medium"
                          onClick={() => {
                            setDeleteProcess({
                              open: true,
                              title: process,
                            });
                          }}
                          sx={{
                            cursor: "pointer",
                          }}
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 40, 80]}
          component="div"
          count={processes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
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
            justifyContent="flex-end"
          >
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
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            maxWidth: "40vw",
          },
        }}
      >
        <DialogTitle>Add Process</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter the process name.</DialogContentText>
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
          <Button onClick={() => setAddProcess({ open: false })}>Cancel</Button>
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
    </Container>
  );
}

export default Processes;
