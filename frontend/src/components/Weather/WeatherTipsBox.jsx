import React from 'react';

const WeatherTipsBox = ({ weatherCondition }) => {
  // Function to generate tips based on weather condition
  const generateTips = () => {
    if (!weatherCondition) {
      return <h3>No tips available for this weather condition.</h3>;
    }

    const condition = weatherCondition.toLowerCase();

    switch (condition) {
      case 'clear':
        return (
          <>
            <h3>Tips for Clear Weather:</h3>
            <ul>
              <li>Enjoy outdoor activities like hiking or picnicking.</li>
              <li>Stay hydrated and protect your skin from UV rays.</li>
            </ul>
          </>
        );
      case 'cloudy':
      case 'partially cloudy':
        return (
          <>
            <h3>Tips for Cloudy Weather:</h3>
            <ul>
              <li>Carry an umbrella or raincoat in case of rain.</li>
              <li>Visit indoor attractions like museums or art galleries.</li>
            </ul>
          </>
        );
      case 'snow':
        return (
          <>
            <h3>Tips for Snowy Weather:</h3>
            <ul>
              <li>Wear warm clothing and boots.</li>
              <li>Be cautious of slippery roads and sidewalks.</li>
            </ul>
          </>
        );
        case 'rain,overcast':
        return (
          <>
            <h3>Tips for Rainy Weather:</h3>
            <ul>
              <li>Wear waterproof clothing and footwear.</li>
              <li>Plan indoor activities like watching movies or cooking.</li>
            </ul>
          </>
        );
      
      case 'rain':
        return (
          <>
            <h3>Tips for Rainy Weather:</h3>
            <ul>
              <li>Wear waterproof clothing and footwear.</li>
              <li>Plan indoor activities like watching movies or cooking.</li>
            </ul>
          </>
        );
      default:
        return <h3>No tips available for this weather condition.</h3>;
    }
  };

  return (
    <div className="weather-tips-box">
      {generateTips()}
    </div>
  );
};

export default WeatherTipsBox;
