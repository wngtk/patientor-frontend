import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { SyntheticEvent } from "react";
import { HealthCheckEntry, Patient } from "../../types";
import patientsService from "../../services/patients";
import axios, { AxiosError } from "axios";

// 做类型体操啦！
// 把原本想要的字段类型转换成每个字段都是一个对象里面有个 value
type Target<Type> = {
  [Property in keyof Type]: { value: string }
}

type HealthCheckEntryWithoutId = Omit<HealthCheckEntry, 'id'>

interface Props {
  patientId: string,
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>,
  setError: (message: string) => void
}

const EntryForm = ({ patientId, setPatient, setError }: Props) => {
  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()
    const target = event.target as typeof event.target & Target<HealthCheckEntryWithoutId>;

    const newEntry: HealthCheckEntryWithoutId = {
      date: target.date.value,
      description: target.description.value,
      healthCheckRating: Number(target.healthCheckRating.value),
      specialist: target.specialist.value,
      type: "HealthCheck",
    }

    if (target.diagnosisCodes?.value) {
      newEntry.diagnosisCodes = target.diagnosisCodes.value.split(',')
    }

    console.log(newEntry)

    try {
      const data = await patientsService.addEntry(patientId, newEntry)
      setPatient(data)
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data && typeof error.response.data.error === 'string') {
          setError(error.response.data.error)
        }
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack mt={2} p={2} sx={{ border: "2px dashed grey" }}>
        <Typography fontWeight="bolder" pt={2} pb={2}>
          New HealthCheck entry
        </Typography>
        <TextField id="standard-basic" label="Description" variant="standard" name="description" />
        <TextField id="standard-basic" label="Date" variant="standard" name="date" />
        <TextField id="standard-basic" label="Specialist" variant="standard" name="specialist" />
        <TextField
          id="standard-basic"
          label="HealthCheck rating"
          variant="standard"
          name="healthCheckRating"
        />
        <TextField
          id="standard-basic"
          label="Diagnosis codes"
          variant="standard"
          name="diagnosisCodes"
        />
        <Box display="flex" justifyContent="space-between" pt={2}>
          <Button variant="contained" color="warning">
            CANCEL
          </Button>
          <Button variant="contained" color="secondary" type="submit">
            ADD
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export default EntryForm;
