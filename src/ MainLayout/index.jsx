import React from 'react';

import WaterSpdShow from './CenterVisualSpd.jsx';
import DirectionShow from './CenterVisualDir.jsx'
import LocationCard from './LocationCardShow.jsx'
import TimeDateShow from './TimeShow.jsx';
import SpdDateShow from './SpdShow.jsx';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import DirectionCard from './DirectionCardShow.jsx'
import NumberShow from './CenterVisualNum.jsx';
import NotionAreaShow from './NotionArea.jsx';
import CameraFroFeed from './CamFroShow.jsx';
import CameraBehFeed from './CamBehShow.jsx';


const App = () => {
    return (
        <>
            <Box position='static' sx={{ backgroundColor: "#191A1D", width: 700, height: 190, position: 'fixed', top: '30%', left: '40%', zIndex: '1800' }}>
                <Stack direction='row'>
                    <NumberShow />
                    <DirectionShow />
                    <WaterSpdShow />

                </Stack>
            </Box>

            <Box>
                <Stack direction='row'>

                    <Stack direction='column'>
                        <TimeDateShow />
                        <LocationCard />
                        <SpdDateShow />
                        <DirectionCard />
                    </Stack>

                    <Stack direction='column' sx={{ position: "relative", top: 15, left: 30, }} >
                        <NotionAreaShow />
                        <CameraFroFeed />
                        <CameraBehFeed />



                    </Stack>

                </Stack>

            </Box>
        </>
    );
};

export default App;
