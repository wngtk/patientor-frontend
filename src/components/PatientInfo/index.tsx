import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Diagnosis, Patient} from "../../types";
import patients from "../../services/patients";
import GenderIcon from "./GenderIcon";
import Entries from "./Entries.tsx";
import EntryForm from "./EntryForm.tsx";
import Notify from "../Notify.tsx";
import diagnosisService from "../../services/diagnosis.ts";

const PatientInfo = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [message, setMessage] = useState('')
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([])

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

  useEffect(() => {
    diagnosisService.getAll()
      .then(data => setDiagnosis(data))
  }, [])

  const notify = (message: string) => {
    setMessage(message);
    setTimeout(() => {
      setMessage('');
    }, 5000);
  }

  return (
    <div>
      {patient && (
        <>
          <h2>
            {patient.name} <GenderIcon gender={patient.gender} />
          </h2>
          <div>ssn: {patient.ssn}</div>
          <div>occupation: {patient.occupation}</div>
          <Notify errorMessage={message} />
          <EntryForm patientId={id} setPatient={setPatient} setError={notify} diagnosis={diagnosis} />
          <Entries
              entries={patient.entries}
          />
        </>
      )}
    </div>
  );
};

export default PatientInfo;
