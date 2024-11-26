import SIW from './SpeedInWater.jsx';
import SOG from './SpeedOverGround.jsx';
import { Box, Typography, Stack, Divider } from "@mui/material";

const SpdDateShow = () => {
    return (
        <>
            <Box sx={{
                width: 361,
                height: 110,
                borderRadius: 6,
                position: "relative",
                top: 35,
                left: 15,
            }} >
                <Stack direction='row' spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
                    <SIW />
                    <SOG />
                </Stack>
            </Box>
        </>
    )
}

export default SpdDateShow;
