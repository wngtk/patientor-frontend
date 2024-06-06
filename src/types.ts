export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}


interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare'
  employerName: string
  sickLeave?: {
    startDate: string
    endDate: string
  }
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital'
  discharge: {
    date: string
    criteria: string
  }
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck'
  healthCheckRating: number
}

export type Entry = OccupationalHealthcareEntry | HospitalEntry | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}

export type NoSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type PatientFormValues = Omit<Patient, "id" | "entries">;

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
