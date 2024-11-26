import UTC from './UTCShow.jsx';
import ST from './STShow.jsx';

import { Box, Typography, Stack, Divider } from "@mui/material";


const TimeDateShow = () => {
    return (
        <>
            <Box sx={{
                backgroundColor: "#272729",
                //border: 1,
                //borderColor: "white",
                width: 361,
                height: 110,
                borderRadius: 6,
                position: "relative",
                top: 15,
                left: 15,
            }} >
                <Box sx={{}}>
                    <Stack direction='row' spacing={4} sx={{ justifyContent: "center", alignItems: "center" }}>
                        <UTC />
                        <Stack sx={{ height: 65 }}>
                            <img loading="lazy" src='./Rectangle9.png' height='100%' />
                        </Stack>
                        <ST />
                    </Stack>
                </Box>
            </Box>
        </>
    )
}

export default TimeDateShow;

