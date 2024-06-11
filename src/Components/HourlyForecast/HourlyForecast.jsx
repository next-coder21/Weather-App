import React, { useState, useEffect } from 'react';

const HourlyForecast = ({ lat, lon }) => {
  console.log(lat, lon);

  const API_KEY = 'f3ac4b366ed40ea65ea8a1c88f946f02';
  const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';
  
  const [hourlyData, setHourlyData] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchHourlyData = async () => {
      try {
        const response = await fetch(`${API_URL}?lat=${lat}&lon=${lon}&units=metric&cnt=14&appid=${API_KEY}`);
        const data = await response.json();
        setHourlyData(data);
      } catch (error) {
        setError(error);
      }
    };
  
    if (lat && lon) {
      fetchHourlyData();
    }
  }, [lat, lon]);
  if (hourlyData) {
    return (
        <>
       
      <div className='flex justify-between gap-2 p-1 lg:overflow-y-hidden overflow-y-scroll' >
        {hourlyData.list.map((hour)=>(
            <div className='border-2 border-white bg-gray-300 text-center p-2 rounded-lg w-52' key={hour.dt}>
            <p className=' text-sm'>{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
            <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@4x.png`} alt="icon" />
              <p>{hour.main.temp} C</p>
              
            </div>
        ))}
      </div>
      
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default HourlyForecast;