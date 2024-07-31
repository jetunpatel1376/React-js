import { useState } from "react";
function Form() {
  const [Location, setLocation] = useState("");
  const [watherData, setWatherData] = useState(null); // Initial state changed to null

  // Function to fetch data
  async function getData(location) {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=4bd4e2c9b25649eea1f125244242307&q=${location}`
      );
      const data = await response.json();
      console.log(data);
      setWatherData({
        icon: data.current.condition.icon,
        text: data.current.condition.text,
        humidity: data.current.humidity,
        temp_c: data.current.temp_c,
        temp_f: data.current.temp_f,
        wind_kph: data.current.wind_kph,
        wind_mph: data.current.wind_mph,
        wind_degree: data.current.wind_degree,
        wind_direction: data.current.wind_dir,
        country: data.location.country,
        region: data.location.region,
        name: data.location.name,
        lat: data.location.lat,
        lon: data.location.lon,
      });
    } catch (e) {
      console.log(e);
      alert("Failed to fetch data");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(Location);
    getData(Location);
  }

  return (
    <>
      <div className="main">
        <div className="form-container">
          <form className="weather-form" onSubmit={handleSubmit}>
            <input
              className="location-input"
              type="text"
              value={Location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
            />
            <button className="submit-button" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="box-border h-30 w-32 p-4 border-4 bg-[#e879f9] text-white" >
          {watherData ? (
            <>
              <img
                className="weather-icon"
                src={watherData.icon}
                alt="weather_icon"
              />
              <h3 className="weather-text">{watherData.text}</h3>
              <h2 className="temp-c">{watherData.temp_c}°C</h2>
              <h2 className="location-name">{watherData.name}</h2>
              <h3 className="region">{watherData.region}</h3>
              <h3 className="country">{watherData.country}</h3>
              <h2 className="humidity">Humidity: {watherData.humidity}%</h2>
            </>
          ) : (
            <p className="loading-text">Loading...</p> // Display a loading message while fetching data
          )}
        </div>
      </div>
    </>
  );
}

export default Form;
