import { Button, Grid, TextField, MenuItem } from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

const EditStepForm = ({ step, editStep, closeEditDialog }) => {
  const getpreviousStep = (currentStep) => {
    const previousStep = parseInt(currentStep, 10) - 1;
    return previousStep.toString().padStart(3, "0");
  };

  const previousStep = getpreviousStep(step.commandStep);

  const schema = yup.object().shape({
    commandStep: yup.string().required(),
    commandSubStep: yup.string().required(),
    commandType: yup.string().required("Please select a command type"),
    commandDescription: yup
      .string()
      .required("Please enter a description.")
      .max(150, "Description should not exceed 150 characters")
      .matches(
        /^[A-Za-z0-9()\/_\-\  ]*$/,
        "Only () / _ - special characters are allowed. You cannot press enter to go to next line"
      ),
    command: yup
      .string()
      .required("Please enter a command.")
      .matches(/^[^\n]*$/, "Enter key is not allowed"),
    commandEnabled: yup
      .string()
      .required("Please select an option for command enabled"),
    commandContinueOnError: yup
      .string()
      .required("Please select if the command should continue on error"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      commandStep: step.commandStep,
      commandSubStep: "000",
      commandType: step.commandType,
      commandDescription: step.commandDescription,
      command: step.command,
      commandEnabled: step.commandEnabled,
      commandContinueOnError: step.commandContinueOnError,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    editStep(data);
    closeEditDialog();
  };

  return (
    <Grid
      container
      spacing={2}
      py={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          height: "100%",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item md={6} sm={6}>
              <TextField
                fullWidth
                label="Step"
                variant="outlined"
                disabled
                {...register("commandStep")}
                error={!!errors.commandStep}
                helperText={errors?.commandStep?.message}
              />
            </Grid>
            <Grid item md={6} sm={6}>
              <TextField
                fullWidth
                label="Type"
                select
                variant="outlined"
                {...register("commandType")}
                error={!!errors.commandType}
                helperText={errors?.commandType?.message}
                defaultValue={step.commandType}
              >
                {["EPMAutomate", "PSScriptBlock", "PSScriptFile"].map(
                  (commandType) => (
                    <MenuItem key={commandType} value={commandType}>
                      {commandType}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>
            <Grid item md={12} sm={12}>
              <TextField
                fullWidth
                multiline
                rows={5}
                label="Description"
                variant="outlined"
                {...register("commandDescription")}
                error={!!errors.commandDescription}
                helperText={errors?.commandDescription?.message}
              />
            </Grid>
            <Grid item md={12} sm={12}>
              <TextField
                fullWidth
                multiline
                rows={5}
                label="Command"
                variant="outlined"
                {...register("command")}
                error={!!errors.command}
                helperText={errors?.command?.message}
              />
            </Grid>
            <Grid item md={6} sm={6}>
              <TextField
                fullWidth
                select
                label="Enabled"
                variant="outlined"
                {...register("commandEnabled")}
                error={!!errors.commandEnabled}
                helperText={errors?.commandEnabled?.message}
                defaultValue={step.commandEnabled}
              >
                {[
                  {
                    value: "True",
                    label: "Step enabled",
                  },
                  {
                    value: "False",
                    label: "Step disabled",
                  },
                  {
                    value: `enabled:ifSuccess:${previousStep}:000`,
                    label: "Step Enabled If Previous Step Succeeds",
                  },
                  {
                    value: `enabled:ifFail:${previousStep}:000`,
                    label: "Step Enabled If Previous Step Fails",
                  },
                ].map((commandEnabled) => (
                  <MenuItem
                    key={commandEnabled.value}
                    value={commandEnabled.value}
                  >
                    {commandEnabled.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} sm={6}>
              <TextField
                fullWidth
                select
                label="Continue On Error"
                variant="outlined"
                {...register("commandContinueOnError")}
                error={!!errors.commandContinueOnError}
                helperText={errors?.commandContinueOnError?.message}
                defaultValue={step.commandContinueOnError}
              >
                <MenuItem value="True">Continue Process On Error</MenuItem>
                <MenuItem value="False">Terminate Process On Error</MenuItem>
              </TextField>
            </Grid>
            <Grid
              item
              md={12}
              sm={12}
              mt={2}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                type="submit"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default EditStepForm;
