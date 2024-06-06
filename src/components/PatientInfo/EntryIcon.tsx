import { Entry } from "../../types"
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';

interface Props {
    type: Entry['type']
}
const EntryIcon = ({ type }: Props) => {
    switch(type) {
        case "OccupationalHealthcare":
            return <WorkIcon />
        case "Hospital":
            return <LocalHospitalIcon />
        case "HealthCheck":
            return <MedicalServicesIcon />
    }
}

export default EntryIcon
