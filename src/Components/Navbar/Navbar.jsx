import React, { useState } from "react";

const Navbar = ({lat,lon}) => {
  const [search, setSearch] = useState("");
  var text;
  function handlechange(event) {
    event.preventDefault();
    text = event.target.value;
    location(text);
  }

  async function location() {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${text}&limit=5&appid=f3ac4b366ed40ea65ea8a1c88f946f02`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      const lat = result[0].lat.toString().slice(0, 5);
      const lon = result[0].lon.toString().slice(0, 5);
      const otherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=f3ac4b366ed40ea65ea8a1c88f946f02`;
      const otherResponse = await fetch(otherApiUrl);
      const otherResult = await otherResponse.json();
      console.log(otherResult);
      setSearch(otherResult);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="p-5 w-screen">
        <div className="h-16 md:w-5/6 w-full rounded-full bg-blue-300 mx-auto p-2">
          <div className="my-auto">
            <div className="grid grid-cols-3  ">
              <a
                href=""
                className="text-2xl text-violet-800 pl-3 items-start pt-2"
              >
                WeatherAtios
              </a>
              <div className="text-xl text-yellow-600 mx-auto pt-1">
                <form className="form-control">
                  <input
                    className="rounded-full w-56 pl-4 h-10"
                    type="text"
                    onChange={handlechange}
                  />
                </form>
              </div>
              <div className="text-2xl text-violet-800 pr-3 text-end pt-2">
                3
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
