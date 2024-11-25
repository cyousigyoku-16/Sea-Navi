import UTC from './UTCShow.jsx';
import ST from './STShow.jsx';

import { Box, Typography, Stack } from "@mui/material";


const TimeDateShow = () => {
    return (
        <>
            <Box>
                <Stack direction='row' spacing={1} sx={{ justifyContent: "center", alignItems: "center" }}>
                    <UTC />
                    <ST />
                </Stack>
            </Box>
        </>
    )
}

export default TimeDateShow;

