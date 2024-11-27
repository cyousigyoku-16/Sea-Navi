import React from 'react';

import ShipCrs from './ShipDateShow.jsx';
import ShipDir from './ShipDirShow.jsx';
import WindCrs from './WindDateShow.jsx';
import WindSpeed from './WindSpeedShow.jsx';
import WaterSpdShow from './CenteVisualSpd.jsx';
import DirectionShow from './CenteVisualDir.jsx'
import LocationCard from './LocationCardShow.jsx'
import TimeDateShow from './TimeShow.jsx';
import SpdDateShow from './SpdShow.jsx';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import DirectionCard from './DirectionCardShow.jsx'
const App = () => {
    return (
        <>
            <Box position='static' sx={{ border: 1, borderColor: 'white', width: 1000, position: 'fixed', top: '30%', left: '40%', }}>
                <Stack direction='row'>
                    <Stack>
                        <Box sx={{ height: 50 }}></Box>
                        <ShipCrs />
                        <ShipDir />
                        <WindCrs />
                        <WindSpeed />
                    </Stack>
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
