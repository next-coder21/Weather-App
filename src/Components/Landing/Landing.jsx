
import React, { useState, useEffect } from "react";



import CurrentDateTime from "../Datetime/CurrentDateTime";
import Loading from "../Loading/Loading";
import TemperatureComponent from "../Tempcomp/TemperatureComponent";


const Landing = () => {
  const [datas, setDatas] = useState({});
  const [pollution, setPollution] = useState({});
  const [loading, setLoading] = useState(true);
  const [Search,setSearch] = useState({});
  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
  });
  
  useEffect(() => {
    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      const formattedLatitude = latitude.toFixed(5);
      const formattedLongitude = longitude.toFixed(5);
      setLocation({ latitude: formattedLatitude, longitude: formattedLongitude });
      fetchData(formattedLatitude, formattedLongitude);
    };
  
    const handleError = (error) => {
      console.error(error);
    };
  
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  
  const getSearchResult = async () => {
    try {
      const cityInput = document.getElementById("cityname");
      const city = cityInput.value.trim(); 
  
     
  
      const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=f3ac4b366ed40ea65ea8a1c88f946f02`; 
      const response = await fetch(apiUrl);
  
      
  
      const searchResult = await response.json();
      console.log(searchResult);
      searchResult.forEach((result) => {
        setLocation({
      latitude : result.lat.toString().slice(0, 5),
      longitude : result.lon.toString().slice(0, 5),
    });
        fetchData(lat, lon);
        

        
      });
      
      
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const fetchData = async (lat, lon) => {
    try {
      const apiUrl = 'https://api.openweathermap.org/data/2.5';
      const apiKey = 'f3ac4b366ed40ea65ea8a1c88f946f02';
      const units = 'metric';
  
      const [weatherResponse, pollutionResponse] = await Promise.all([
        fetch(`${apiUrl}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`),
        fetch(`${apiUrl}/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`),
      ]);
  
      const [data, pollutionData] = await Promise.all([
        weatherResponse.json(),
        pollutionResponse.json(),
      ]);
  
      console.log(data);
      console.log(pollutionData);
  
      setDatas(data);
      setPollution(pollutionData);
      this.render();
  
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  };
   

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
var lat=location.latitude;
var lon=location.longitude;


console.log(lat,lon);



  return (
    <>
      <div className=" h-auto w-100">
        <div className="date-time w-100 h-auto p-6">
        <div className="grid md:grid-cols-2 grid-cols-1"><div> <h1 className="text-2xl font-bold text-zinc-800">
            {datas.name}, {datas.sys.country}
          </h1>
         
          <h1 className="text-lg font-medium text-zinc-700">
            <CurrentDateTime lat={lat} lon={lon} />
          </h1>
          </div><div className="items-center">
            <div><input type="text" placeholder="  Search city" id="cityname" onMouseLeave={getSearchResult}></input></div>
          </div></div>
        </div>
        <div className="grid grid-cols-12  gap-2 p-4 h-auto">
          <div className="col-span-12 sect p-3">
            <TemperatureComponent lat={lat} lon={lon} />
          </div>
          
        </div>
        <div className="">{pollution.list[0].main.aqi}</div>
      </div>
    </>
  );
};

export default Landing;
