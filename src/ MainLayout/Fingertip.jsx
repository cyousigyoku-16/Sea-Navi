import React from 'react';
import FullCircleGaugeChart from './FullCircleGaugeChart';
import ShipCrs from './ShipDateShow.jsx';
import ShipDir from './ShipDirShow.jsx';
import WindCrs from './WindDateShow.jsx';
import WindSpeed from './WindSpeedShow.jsx';
import SpeedProgressBar from './SpeedBarShow.jsx';
import WaterSpeedChart from './WaterSpeedChart';
import WaterSpeed from './WaterSpeedShow.jsx';
import { Box } from '@mui/material';
import DirectionShow from './CenteVisual.jsx'

import TimeDateShow from './TimeShow.jsx';
const App = () => {
    return (
        <>
            <DirectionShow />
            <ShipCrs />
            <ShipDir />
            <WindCrs />
            <WindSpeed />
            <WaterSpeedChart />
            <WaterSpeed />
            <TimeDateShow />
        </>
    );
};

export default App;
