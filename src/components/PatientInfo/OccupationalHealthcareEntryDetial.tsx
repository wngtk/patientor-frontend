import { Card, CardContent, Typography } from "@mui/material";
import { OccupationalHealthcareEntry } from "../../types";
import WorkIcon from '@mui/icons-material/Work';

interface Props {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryDetial = ({ entry }: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography>
          {entry.date}
          <WorkIcon />
          {entry.employerName}
        </Typography>
        <Typography sx={{ fontStyle: "italic"}}>
            {entry.description}
        </Typography>
        <Typography>
            diagnose by {entry.specialist}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OccupationalHealthcareEntryDetial;
