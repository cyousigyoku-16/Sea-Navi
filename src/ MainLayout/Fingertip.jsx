import React from 'react';
import FullCircleGaugeChart from './FullCircleGaugeChart';
import ShipCrs from './ShipDateShow.jsx';
import ShipDir from './ShipDirShow.jsx';
import WindCrs from './WindDateShow.jsx';
import WindSpeed from './WindSpeedShow.jsx';
import SpeedProgressBar from './SpeedBarShow.jsx';
import WaterSpeedChart from './WaterSpeedChart';
import WaterSpeed from './WaterSpeedShow.jsx';

const App = () => {
    return (
        <div>
            <h1></h1>
            <FullCircleGaugeChart />
            <ShipCrs />
            <ShipDir />
            <WindCrs />
            <WindSpeed />
            <SpeedProgressBar />
            <WaterSpeedChart />
            <WaterSpeed />
        </div>
    );
};

export default App;
