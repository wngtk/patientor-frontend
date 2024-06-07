import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Diagnosis, EntryWithoutId, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, Patient } from "../../types";
import patientsService from "../../services/patients";
import axios from "axios";

// 做类型体操啦！
// 把原本想要的字段类型转换成每个字段都是一个对象里面有个 value
type Target<Type> = {
  [Property in keyof Type]: Property extends keyof Type[Property] ? Target<Property> :  { value: string } ;
};

type HealthCheckEntryWithoutId = Omit<HealthCheckEntry, "id">;
type HospitalEntryWithoutId = Omit<HospitalEntry, "id">;
type OccupationalHealthcareEntryWithoutId = Omit<OccupationalHealthcareEntry, "id">;

interface Props {
  patientId: string;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  setError: (message: string) => void;
  diagnosis: Diagnosis[]
}

const EntryForm = ({ patientId, setPatient, setError, diagnosis }: Props) => {
  const [entryType, setEntryType] = useState("HealthCheck");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])


  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    
    let entry: EntryWithoutId
    
    if (entryType === "HealthCheck") {
      const target = event.target as typeof event.target &
        Target<HealthCheckEntryWithoutId>;

      const newEntry: HealthCheckEntryWithoutId = {
        date: target.date.value,
        description: target.description.value,
        healthCheckRating: Number(target.healthCheckRating.value),
        specialist: target.specialist.value,
        type: "HealthCheck",
      };
  
      if (target.diagnosisCodes?.value) {
        newEntry.diagnosisCodes = target.diagnosisCodes.value.split(",");
      }

      entry = newEntry
    } else if (entryType === "Hospital") {
      const target = event.target as typeof event.target & Target<HospitalEntryWithoutId> & {
        dischargeCriteria: { value: string},
        dischargeDate: { value: string },
      }
      const newEntry: HospitalEntryWithoutId = {
        date: target.date.value,
        description: target.description.value,
        specialist: target.specialist.value,
        type: "Hospital",
        discharge: {
          criteria: target.dischargeCriteria.value,
          date: target.dischargeDate.value
        }
      }

      if (target.diagnosisCodes?.value) {
        newEntry.diagnosisCodes = target.diagnosisCodes.value.split(",");
      }

      entry = newEntry
    } else if (entryType === "OccupationalHealthcare") {
      const target = event.target as typeof event.target & Target<OccupationalHealthcareEntryWithoutId> & {
        sickLeaveStartDate: { value: string},
        sickLeaveEndDate: { value: string}
      }
      const newEntry: OccupationalHealthcareEntryWithoutId = {
        date: target.date.value,
        description: target.description.value,
        specialist: target.specialist.value,
        type: "OccupationalHealthcare",
        employerName: target.employerName.value
      }
      if (target.diagnosisCodes?.value) {
        newEntry.diagnosisCodes = target.diagnosisCodes.value.split(",");
      }

      if (target.sickLeaveStartDate.value && target.sickLeaveEndDate.value) {
        newEntry.sickLeave = {
          startDate: target.sickLeaveStartDate.value,
          endDate: target.sickLeaveEndDate.value
        }
      }

      entry = newEntry      
    } else {
      throw new Error('Unsupported entry type')
    }

    try {
      const data = await patientsService.addEntry(patientId, entry);
      setPatient(data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (
          error.response?.data &&
          typeof error.response.data.error === "string"
        ) {
          setError(error.response.data.error);
        }
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack mt={2} p={2} sx={{ border: "2px dashed grey" }}>
        <Box fontWeight="bolder" pt={2} pb={2}>
          New{" "}
          <Select
            id="demo-simple-select-standard"
            value={entryType}
            onChange={({ target }) => setEntryType(target.value)}
          >
            <MenuItem value="HealthCheck">HealthCheck</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              OccupationalHealthcare
            </MenuItem>
          </Select>{" "}
          entry
        </Box>
        <TextField
          id="standard-basic"
          label="Description"
          variant="standard"
          name="description"
        />
        <TextField
          id="standard-basic"
          label="Date"
          variant="standard"
          name="date"
          type="date"
          value="2024-12-21"
        />
        <TextField
          id="standard-basic"
          label="Specialist"
          variant="standard"
          name="specialist"
        />
        {entryType === "HealthCheck" && (
          <TextField
            id="standard-basic"
            label="HealthCheck rating"
            variant="standard"
            name="healthCheckRating"
          />
        )}
        {entryType === "OccupationalHealthcare" && (
          <>
            <TextField
              id="standard-basic"
              label="Employ Name"
              variant="standard"
              name="employName"
            />
            <TextField
              id="standard-basic"
              label="Sick Leave Start Date"
              variant="standard"
              name="sickLeaveStartDate"
            />
            <TextField
              id="standard-basic"
              label="Sick Leave End Date"
              variant="standard"
              name="sickLeaveEndDate"
            />
          </>
        )}
        {entryType === "Hospital" && (
          <>
            <TextField
              id="standard-basic"
              label="Discharge date"
              variant="standard"
              name="dischargeDate"
            />
            <TextField
              id="standard-basic"
              label="Discharge criteria"
              variant="standard"
              name="dischargeCriteria"
            />
          </>
        )}
        <TextField
          id="standard-basic"
          label="Diagnosis codes"
          variant="standard"
          name="diagnosisCodes"
        />
        <Select
          multiple
          value={diagnosisCodes}
          onChange={({ target: { value } }) => setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value)}
        >
          {diagnosis.map((d) => (
            <MenuItem
              key={d.name}
              value={d.code}
            >
              {d.code}
            </MenuItem>
          ))}
        </Select>
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
