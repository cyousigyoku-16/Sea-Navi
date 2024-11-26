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
            <LocationCard />
            <SIW />
            <SOG />
        </>
    );
};

export default App;
