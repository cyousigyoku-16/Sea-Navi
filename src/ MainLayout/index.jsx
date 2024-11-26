import React from 'react';

import ShipCrs from './ShipDateShow.jsx';
import ShipDir from './ShipDirShow.jsx';
import WindCrs from './WindDateShow.jsx';
import WindSpeed from './WindSpeedShow.jsx';
import WaterSpeedChart from './WaterSpeedChart.js';
import WaterSpeed from './WaterSpeedShow.jsx';
import DirectionShow from './CenteVisual.jsx'
import LocationCard from './LocationCardShow.jsx'
import TimeDateShow from './TimeShow.jsx';
import SIW from './SpeedInWater.jsx';
import SOG from './SpeedOverGround.jsx';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
const App = () => {
    return (
        <>
            <Box  position='static' sx={{border:1, borderColor:'white', width:1000, position: 'fixed', top: '30%', left: '40%',}}>
                     <Stack direction='row'>
                        <Stack>
                           <Box sx={{height:50}}></Box>
                            <ShipCrs />
                            <ShipDir />
                            <WindCrs />
                            <WindSpeed />
                        </Stack>
                       <DirectionShow />
                       <WaterSpeedChart />
                    </Stack>
            </Box>
            
            <WaterSpeed />
            <TimeDateShow />
            <LocationCard />
            <SIW />
            <SOG />
        </>
    );
};

export default App;
