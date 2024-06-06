import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Diagnosis, Patient} from "../../types";
import patients from "../../services/patients";
import GenderIcon from "./GenderIcon";
import Entries from "./Entries.tsx";
import diagnosisService from "../../services/diagnosis.ts";

const PatientInfo = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

  console.log(id);

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      setPatient(await patients.getById(id));
    };
    void fetchPatient();
  }, [id]);

  useEffect(() => {
    diagnosisService.getAll()
        .then(data => setDiagnosis(data));
  }, []);

  return (
    <div>
      {patient && (
        <>
          <h2>
            {patient.name} <GenderIcon gender={patient.gender} />
          </h2>
          <div>ssn: {patient.ssn}</div>
          <div>occupation: {patient.occupation}</div>
          <Entries
              entries={patient.entries}
              diagnosis={diagnosis}
          />
        </>
      )}
    </div>
  );
};

export default PatientInfo;
