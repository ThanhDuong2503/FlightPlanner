import React, {useState} from "react";
import "./WeatherContainer.css";

const openWeatherApi = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

function WeatherContainer() {

    const [query, setQuery] = useState("");
    const [weatherData, setWeatherData] = useState({});

    const search = event => {
        if (event.key === "Enter") {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${openWeatherApi}`)
                .then(response => response.json())
                .then(data => {
                    setWeatherData(data);
                    // clear input field after a search
                    setQuery("");
                });
        }
    }

    const currentDate = (dateData) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        const day = days[dateData.getDay()];
        const date = dateData.getDate();
        const month = months[dateData.getMonth()];
        const year = dateData.getFullYear();

        return `${day} , ${date} ${month} ${year}`
    }

    // used for weather-info
    const visibilityInMetre = weatherData.visibility;

    // switch backGroundImage depending on weatherState
    let backGround = "Clear";
    if (typeof (weatherData.weather) !== "undefined") {
        const weatherState = weatherData.weather[0].main;

        switch (weatherState) {
            case "Clear":
                backGround = "Clear";
                break;
            case "Thunderstorm":
                backGround = "Thunderstorm";
                break;
            case "Drizzle":
                backGround = "Drizzle";
                break;
            case "Rain":
                backGround = "Rain";
                break;
            case "Snow":
                backGround = "Snow";
                break;
            case "Atmosphere":
                backGround = "Atmosphere";
                break;
            case "Clouds":
                backGround = "Clouds";
                break;
            default:
                backGround = "Clear"
        }
    }

    return (
        <div className={weatherData.weather ? backGround : "Clear"}>
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Enter city or zip code..."
                        onChange={event => setQuery(event.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>

                {weatherData.main &&
                <div>
                    <div className="location-box">
                        <div className="location">{weatherData.name}, {weatherData.sys.country}</div>
                        <div className="date">{currentDate(new Date())}</div>
                    </div>
                    <div className="weather-box">
                        <div className="temp">
                            {Math.round(weatherData.main.temp)}°C
                        </div>
                        <div className="weather">{weatherData.weather[0].main}</div>
                        <div className="weather">
                            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/></div>
                        <div className="weather-info">Condition: {weatherData.weather[0].description}</div>
                        <div className="weather-info">Wind: {weatherData.wind.deg}° {weatherData.wind.speed}m/s</div>
                        <div className="weather-info">Visibility: {visibilityInMetre / 1000}km</div>
                        <div className="weather-info">Pressure: {weatherData.main.pressure}hPa</div>
                        <div className="weather-info">Humidity: {weatherData.main.humidity}%</div>
                        <div className="weather-info">Cloudiness: {weatherData.clouds.all}%</div>
                    </div>
                </div>
                };
            </main>
        </div>
    );
}

export default WeatherContainer;