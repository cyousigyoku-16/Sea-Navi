import SpeedProgressBar from './SpeedBarShow.jsx';
import FullCircleGaugeChart from './FullCircleGaugeChart.js';

import { Box, Typography, Stack } from "@mui/material";


const DirectionShow = () => {
    return (
        <>
            <Box>
                <Stack direction='column' spacing={1} sx={{ justifyContent: "center", alignItems: "center" }}>
                    <FullCircleGaugeChart />
                    <SpeedProgressBar />
                </Stack>
            </Box>
        </>
    )
}

export default DirectionShow;

