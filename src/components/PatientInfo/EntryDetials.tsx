import { Entry, assertNever } from "../../types"
import HealthCheckEntryDetial from "./HealthCheckEntryDetail"
import HospitalEntryDetial from "./HospitalEntryDetial"
import OccupationalHealthcareEntryDetial from "./OccupationalHealthcareEntryDetial"

interface Props {
    entry: Entry
}

const EntryDetials = ({ entry }: Props) => {
    switch(entry.type) {
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryDetial entry={entry} />
        case "Hospital":
            return <HospitalEntryDetial entry={entry} />
        case "HealthCheck":
            return <HealthCheckEntryDetial entry={entry} />
        default:
            assertNever(entry)
    }
}

export default EntryDetials
