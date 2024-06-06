import {Diagnosis, Entry} from "../../types.ts";

interface Props {
    entries: Entry[];
    diagnosis: Diagnosis[];
}

const Entries = ({ entries, diagnosis }: Props) => {
    if (!entries || entries.length === 0) { return null; }

    return (
        <>
            <h3>entries</h3>
            {entries.map((entry) => (
                <div key={entry.id}>
                    <div>{entry.date} <em>{entry.description}</em></div>
                    <ul>
                        {entry.diagnosisCodes?.map((code) => (
                            <li key={code}>{code} {diagnosis.find(d => d.code === code)?.name}</li>
                        ))}
                    </ul>
                </div>))
            }
        </>
    );
};

export default Entries;
