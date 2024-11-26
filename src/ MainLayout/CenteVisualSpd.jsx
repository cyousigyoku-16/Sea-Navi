import WaterSpeed from './WaterSpeedShow.jsx';
import WaterSpeedChart from './WaterSpeedChart.js';

import { Box, Typography, Stack } from "@mui/material";


const WaterSpdShow = () => {
    return (
        <>
            <Box>
                <Stack direction='column' sx={{ justifyContent: "center", alignItems: "center" }}>
                    < WaterSpeedChart />
                    <WaterSpeed />
                </Stack>
            </Box>
        </>
    )
}

export default WaterSpdShow;
