import { Card, Typography } from "@mui/material";
import { HospitalEntry } from "../../types";

interface Props {
  entry: HospitalEntry;
}

const HospitalEntryDetial = ({ entry }: Props) => {
  return (
    <Card>
      <Typography>{entry.date}</Typography>
      <Typography>{entry.description}</Typography>
      <Typography>diagnose by {entry.specialist}</Typography>
    </Card>
  );
};

export default HospitalEntryDetial;
