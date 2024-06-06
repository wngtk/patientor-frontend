import { Box, Stack } from "@mui/material";
import { Entry } from "../../types.ts";
import EntryDetials from "./EntryDetials.tsx";
import "./entry.css";

interface Props {
  entries: Entry[];
}

const Entries = ({ entries }: Props) => {
  if (!entries || entries.length === 0) {
    return null;
  }

  return (
    <>
      <h3>entries</h3>
      <Stack spacing={2}>
        {entries.map((entry) => (
          <EntryDetials key={entry.id} entry={entry} />
        ))}
      </Stack>
    </>
  );
};

export default Entries;
