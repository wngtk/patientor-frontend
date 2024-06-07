import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Patient} from "../../types";
import patients from "../../services/patients";
import GenderIcon from "./GenderIcon";
import Entries from "./Entries.tsx";
import EntryForm from "./EntryForm.tsx";

const PatientInfo = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);

  if (!id) {
    return null
  }

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      setPatient(await patients.getById(id));
    };
    void fetchPatient();
  }, [id]);


  return (
    <div>
      {patient && (
        <>
          <h2>
            {patient.name} <GenderIcon gender={patient.gender} />
          </h2>
          <div>ssn: {patient.ssn}</div>
          <div>occupation: {patient.occupation}</div>
          <EntryForm patientId={id} setPatient={setPatient} />
          <Entries
              entries={patient.entries}
          />
        </>
      )}
    </div>
  );
};

export default PatientInfo;
