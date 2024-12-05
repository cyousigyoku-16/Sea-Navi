import WaterSpeed from './WaterSpeedShow.jsx';
import WaterSpeedChart from './WaterSpeedChart.js';

import { Box, Typography, Stack } from "@mui/material";


const WaterSpdShow = () => {
    return (
        <>
            <Box>
                <Stack direction='column' sx={{ justifyContent: "flex-start", alignItems: "center", position: "relative", left: 50, }}>
                    < WaterSpeedChart />
                    <Stack sx={{
                        position: "relative", top: -30,
                    }}>
                        <WaterSpeed />
                    </Stack>

                </Stack>
            </Box>
        </>
    )
}

export default WaterSpdShow;
