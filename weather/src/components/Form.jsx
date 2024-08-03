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
      <div className="main flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="form-container mb-8">
          <form className="weather-form flex space-x-4" onSubmit={handleSubmit}>
            <input
              className="location-input px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="text"
              value={Location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
            />
            <button className="submit-button px-4 py-2 bg-purple-500 text-white rounded-md shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="box-border h-30 w-50 p-4 border-4 bg-purple-500 text-white rounded-lg shadow-lg flex flex-col items-center justify-center">
          {watherData ? (
            <>
              <img
                className="weather-icon w-18 h-18 mx-auto mb-4"
                src={watherData.icon}
                alt="weather_icon"
              />
              <h3 className="weather-text text-xl font-semibold">{watherData.text}</h3>
              <h2 className="temp-c text-2xl font-bold">{watherData.temp_c}°C</h2>
              <h2 className="location-name text-xl">{watherData.name}</h2>
              <h3 className="region text-md">{watherData.region}</h3>
              <h3 className="country text-md">{watherData.country}</h3>
              <h2 className="humidity text-md">Humidity: {watherData.humidity}%</h2>
            </>
          ) : (
            <p className="loading-text text-lg">Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Form;
