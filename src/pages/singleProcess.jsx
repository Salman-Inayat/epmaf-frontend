import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import axiosInstance from "../axiosInstance";

import AddIcon from "@mui/icons-material/Add";

import AddStepToProcessForm from "../components/form/addStepToProcessForm";
import StepsTable from "../components/tables/stepsTable";

const SingleProcess = () => {
  const { processTitle } = useParams();

  const [steps, setSteps] = useState([]);

  const [addStep, setAddStep] = useState({
    open: false,
    data: {},
  });

  useEffect(() => {
    fetchProcessSteps();
  }, []);

  const fetchProcessSteps = async () => {
    try {
      const response = await axiosInstance.get(`/process/${processTitle}`);
      setSteps(response.data.steps);
    } catch (error) {
      console.log(error);
    }
  };

  const generateNextStepNumber = (steps) => {
    const lastStep = steps[steps.length - 1];
    const lastStepNumber = lastStep.commandStep;
    const nextStepNumber = parseInt(lastStepNumber, 10) + 1;
    return nextStepNumber.toString().padStart(3, "0");
  };

  const handleAddStep = async (data) => {
    try {
      const response = await axiosInstance.post(
        `/process/${processTitle}/step`,
        {
          data,
        }
      );
      setAddStep({ open: false, data: {} });
      fetchProcessSteps();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStep = async (commandStep) => {
    try {
      const response = await axiosInstance.delete(
        `/process/${processTitle}/step/${commandStep}`
      );

      fetchProcessSteps();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={5}>
        <Grid item xs={12} md={12} sm={12} mt={5}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" component="h1">
              {processTitle}
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setAddStep({ open: true, data: {} })}
            >
              Add Step
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={12}>
          {steps.length > 0 && (
            <StepsTable steps={steps} deleteStep={deleteStep} />
          )}
        </Grid>
      </Grid>
      <Dialog
        open={addStep.open}
        onClose={() => setAddStep({ open: false })}
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            maxWidth: "70vw",
          },
        }}
      >
        <DialogTitle>Add Step</DialogTitle>
        <DialogContent>
          <AddStepToProcessForm
            nextProcessStep={
              steps.length > 0 ? generateNextStepNumber(steps) : "001"
            }
            previousProcessStep={
              steps.length > 0 ? steps[steps.length - 1].commandStep : "000"
            }
            handleAddStep={handleAddStep}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default SingleProcess;
