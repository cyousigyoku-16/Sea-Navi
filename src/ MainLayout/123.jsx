import React from 'react';
import ReactDOM from 'react-dom';
import ReactSpeedometer from 'react-d3-speedometer';

const App = () => {
  return (
    <div>
      <h1>React D3 Speedometer 示例</h1>
      <ReactSpeedometer
        maxValue={1000}
        value={573}
        needleColor="red"
        startColor="green"
        endColor="blue"
        segments={5}
        customSegmentLabels={[
          {
            text: "Very Bad",
            position: "INSIDE",
            color: "#555",
          },
          {
            text: "Bad",
            position: "INSIDE",
            color: "#555",
          },
          {
            text: "Ok",
            position: "INSIDE",
            color: "#555",
          },
          {
            text: "Good",
            position: "INSIDE",
            color: "#555",
          },
          {
            text: "Very Good",
            position: "INSIDE",
            color: "#555",
          },
        ]}
        ringWidth={47}
        textColor="red"
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
