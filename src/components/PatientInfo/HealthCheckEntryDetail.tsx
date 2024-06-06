import { Typography } from "@mui/material";
import { HealthCheckEntry } from "../../types";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
  entry: HealthCheckEntry;
}

const HealthCheckEntryDetial = ({ entry }: Props) => {
  const getColor = (value: number) => {
    switch (value) {
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "orange";
      case 3:
        return "red";
      default:
        return "grey";
    }
  };
  return (
    <Card>
      <CardContent>
        <Typography>
          {entry.date}
          <MedicalServicesIcon />
        </Typography>
        <Typography sx={{ fontStyle: "italic" }}>
          {entry.description}
        </Typography>
        <FavoriteIcon style={{ color: getColor(entry.healthCheckRating)}} />
        <Typography>diagnose by {entry.specialist}</Typography>
      </CardContent>
    </Card>
  );
};

export default HealthCheckEntryDetial;
