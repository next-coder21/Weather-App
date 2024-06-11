import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import moment from "moment";
import HourlyForecast from "../HourlyForecast/HourlyForecast";




function TemperatureComponent({ lat, lon }) {
  const API_KEY = 'f3ac4b366ed40ea65ea8a1c88f946f02';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const latt=lat;
const lont=lon;
useEffect(() => {
  const fetchData = async ({ lat, lon }) => {
    try {
      const response = await fetch(`${API_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  fetchData({ lat, lon }); 
}, [lat, lon]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const lo = data.main.temp_min.toString().slice(0, 2);
  const hi = data.main.temp_max.toString().slice(0, 2);
  const feelsLike = data.main.feels_like.toString().slice(0, 2);
  const icon = data.weather[0].icon;
  let link = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  const sunrise = moment.unix(data.sys.sunrise).format('h:mm:ss a');
  const sunset = moment.unix(data.sys.sunset).format('h:mm:ss a');
  const time=moment.unix(data.sys.sunset).format('h:mm:ss a');


  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1">
        <div className="grid grid-cols-2 my-auto">
          <div>
            <img src={link} alt="Weather Icon" />
          </div>
          <div className="p-7">
            <h3 className="text-white text-5xl font-bold">{data.main.temp.toString().slice(0, 4)}°</h3>
            <h3 className="text-white text-lg">
              {data.weather[0].description}
            </h3>
            <p className="text-gray-300 text-sm">
              {hi}°/{lo}°<br/>
              Feels like {feelsLike}°
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2  gap-2">
          <div className="border-white border-2 rounded-lg  w-full">
            <div className=" flex justify-center items-center">
              <img
                src="https://ucarecdn.com/83472876-c21c-4d0e-a495-10544f41fa83/3143249.png"
                alt="humidity"
                className="h-16 w-16 block"
              />
            </div>
            <div className="text-center text-sky-400">
              <h2 className="block">humidity</h2>
              <h2 className="font-bold">{data.main.humidity} %</h2>
            </div>
          </div>
          <div className="border-white border-2 rounded-lg  w-full">
            <div className=" flex justify-center items-center pt-2">
              <img
                src="https://ucarecdn.com/764652e3-9437-4b6e-bac4-ec987fd5b2b4/1649090.png"
                alt="Wind"
                className="h-12 w-12  block"
              />
            </div>
            <div className="text-center text-red-200">
              <h2 className="block">Wind</h2>
              <h2 className="font-bold">{data.wind.speed} km/h,{data.wind.deg}°</h2>
            </div>
          </div>{" "}
          <div className="border-white border-2 rounded-lg  w-full">
            <div className=" flex justify-center items-center">
              <img
                src="https://ucarecdn.com/f5cf0e3f-a21b-4f28-94dd-9fe0bdc8e172/3143234.png"
                alt="Sunrise"
                className="h-16 w-16 block"
              />
            </div>
            <div className="text-center text-sky-200">
              <h2 className="block">Sunrise</h2>
              <h2 className="font-bold">{sunrise}</h2>
            </div>
          </div>{" "}
          <div className="border-white border-2 rounded-lg  w-full">
            <div className=" flex justify-center items-center">
              <img
                src="https://ucarecdn.com/178831ef-7e4a-4307-aa85-2b52d28d104a/3143235.png"
                alt="sunset"
                className="h-16 w-16 block"
              />
            </div>
            <div className="text-center text-sky-200">
              <h2 className="block">sunset</h2>
              <h2 className="font-bold">{sunset} </h2>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="w-100 "><HourlyForecast lat={latt} lon={lont}/></div>
    </>
  );
}

export default TemperatureComponent;
