import { Entry, assertNever } from "../../types"
import HealthCheckEntryDetial from "./HealthCheckEntryDetail"
import OccupationalHealthcareEntryDetial from "./OccupationalHealthcareEntryDetial"

interface Props {
    entry: Entry
}

const EntryDetials = ({ entry }: Props) => {
    switch(entry.type) {
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryDetial entry={entry} />
        case "Hospital":
            return <></>
        case "HealthCheck":
            return <HealthCheckEntryDetial entry={entry} />
        default:
            assertNever(entry)
    }
}

export default EntryDetials
