import React, { useState } from "react";

function Weather() {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const getCityWeather = () => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=df8805b218019cc28ee719f8c0d9667e`;
    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        setLoading(false);
        if (response.message) {
          setError(response.message);
          setData(null);
        } else {
          setError(null);
          setData(response);
        }

        console.log("response", response);
      });
  };
  if (loading) {
    return "Loading.......";
  }

  return (
    <>
      <input
        placeholder="Enter a Location"
        value={location}
        onChange={(e) => {
          setLocation(e.target.value);
        }}
      />
      <button onClick={getCityWeather}>search</button>
      {error ? (
        <>
          <h4 style={{ color: "red" }}>{error}</h4>
        </>
      ) : null}
      {data ? (
        <>
          <h1>current weather</h1>
          <div>Tempreature {data.main.temp}</div>
          <div>presure {data.main.pressure}</div>
          <div>Visability {data.visibility}</div>
        </>
      ) : null}
    </>
  );
}
export default Weather;
