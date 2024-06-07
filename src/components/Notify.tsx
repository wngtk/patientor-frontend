import { Alert } from "@mui/material"

interface Props {
    errorMessage: string
}

const Notify = ({ errorMessage }: Props) => {
    if ( !errorMessage ) {
        return null
    }
    return (
        <Alert severity="error">
            {errorMessage}
        </Alert>
    )
}

export default Notify
