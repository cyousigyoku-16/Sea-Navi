import SpeedProgressBar from './SpeedBarShow.jsx';
import FullCircleGaugeChart from './FullCircleGaugeChart.js';

import { Box, Typography, Stack } from "@mui/material";


const DirectionShow = () => {
    return (
        <>
            <Box>
                <Stack direction='column' sx={{
                    justifyContent: "flex-start", alignItems: "center", position: "relative",
                    top: -5,
                    left: 30,
                }}>
                    <FullCircleGaugeChart />
                    <SpeedProgressBar />
                </Stack>
            </Box>
        </>
    )
}

export default DirectionShow;

