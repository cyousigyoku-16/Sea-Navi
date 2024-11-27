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
const App = () => {
    return (
        <>
            <Box position='static' sx={{ border: 1, borderColor: 'white', width: 700, height: 190, position: 'fixed', top: '30%', left: '40%', }}>
                <Stack direction='row'>
                    <NumberShow />
                    <DirectionShow />
                    <WaterSpdShow />

                </Stack>
            </Box>


            <TimeDateShow />
            <LocationCard />
            <SpdDateShow />
            <DirectionCard />

        </>
    );
};

export default App;
