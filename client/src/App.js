import React from "react";
import cloudy from "./animated/cloudy.svg";
import fewCloudy from "./animated/cloudy-day-1.svg";
import fewCloudyNight from "./animated/cloudy-night-1.svg";
import partlyCloudy from "./animated/cloudy-day-3.svg";
import partlyCloudyNight from "./animated/cloudy-night-3.svg";
import day from "./animated/day.svg";
import night from "./animated/night.svg";
import rain from "./animated/rainy-6.svg";
import drizzleDay from "./animated/rainy-1.svg";
import drizzleNight from "./animated/rainy-5.svg";
import thunder from "./animated/thunder.svg";
import snow from "./animated/snowy-6.svg";
import "./App.css";
import CardCurrent from "./components/cardCurrent";
import CardDaily from "./components/cardDaily";

class App extends React.Component {
  weatherIcons = {
    "01d": day,
    "01n": night,
    "02d": fewCloudy,
    "02n": fewCloudyNight,
    "03d": partlyCloudy,
    "03n": partlyCloudyNight,
    "04d": cloudy,
    "04n": cloudy,
    "09d": drizzleDay,
    "09n": drizzleNight,
    "10d": rain,
    "10n": rain,
    "11d": thunder,
    "11n": thunder,
    "13d": snow,
    "13n": snow,
    "50d": cloudy,
    "50n": cloudy,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "Los Angeles",
      country: "US",
      coord: {
        lon: -118.24,
        lat: 34.05,
      },
      weather: "Clear",
      weatherDesc: "Clear Sky",
      temp: "22°C",
      feelsLike: "25°C",
      humidity: "43%",
      image: day,
      weatherDaily: [],
      weatherHourly: [{ pop: 0 }],
      dates: [],
      search: null,
      showDefaultCard: true,
      error: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.setDates = this.setDates.bind(this);
  }

  async getWeather() {
    try {
      const response = await fetch(`/search/${this.state.search}`, {
        mode: "cors",
      });
      const weatherData = await response.json();
      this.setState({
        name: weatherData.name,
        country: weatherData.sys.country,
        coord: {
          lon: weatherData.coord.lon,
          lat: weatherData.coord.lat,
        },
        weather: weatherData.weather[0].main,
        weatherDesc: weatherData.weather[0].description,
        temp: `${Math.round(parseInt(weatherData.main.temp) - 273.15)}°C`,
        feelsLike: `${Math.round(
          parseInt(weatherData.main.feels_like) - 273.15
        )}°C`,
        humidity: `${weatherData.main.humidity}%`,
        image: this.weatherIcons[weatherData.weather[0].icon],
        showDefaultCard: false,
        error: false,
      });
    } catch (err) {
      this.setState({
        error: true,
      });
    }

    const oneCall = await fetch(
      `/search/detailed/${this.state.coord.lat}&${this.state.coord.lon}`,
      { mode: "cors" }
    );
    const hourlyData = await oneCall.json();
    this.setState({
      weatherDaily: hourlyData.daily,
      weatherHourly: hourlyData.hourly,
    });
  }

  setDates() {
    let nextDay = new Date();
    let dateArray = [];
    let day = {
      0: "Sun",
      1: "Mon",
      2: "Tue",
      3: "Wed",
      4: "Thu",
      5: "Fri",
      6: "Sat",
    };
    let month = {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11: "December",
    };
    let currentDate = "";
    for (let i = 0; i <= 7; i++) {
      nextDay.setDate(new Date().getDate() + i);
      currentDate = `${day[nextDay.getDay()]}, ${
        month[nextDay.getMonth()]
      } ${nextDay.getDate()}`;
      dateArray.push(currentDate);
    }
    this.setState({
      dates: dateArray,
    });
  }

  handleChange({ target }) {
    this.setState({
      search: target.value,
    });
  }

  handleClick(e) {
    e.preventDefault();
    this.getWeather();
    this.setDates();
  }


  render() {
    let displayError = "none";
    let displayExtraInfo = "none";

    if (this.state.error) {
      displayError = "block";
    } else {
      displayError = "none";
    }

    if (this.state.showDefaultCard) {
      displayExtraInfo = "none";
    } else {
      displayExtraInfo = "block";
    }

    return (
      <div className="App">
        <header className="app-header">
          <h1>WeatherToGo</h1>
          <div className="search-div">
            {/* Use onSubmit={() => function}} else it will fire
          the function everytime it re-renders*/}
            <form onSubmit={(e) => this.handleClick(e)}>
              <input
                type="text"
                onChange={this.handleChange}
                placeholder="Search for a City (eg. City, Country)"
              ></input>
              <button className="search-btn" type="submit">
                Search
              </button>
            </form>
          </div>
        </header>
        <div className="current-div">
          <h2 style={{ display: displayError }}>
            Cannot find the city you are looking for :(
          </h2>
          <h2>Current Weather</h2>
          <CardCurrent
            search={this.state.search}
            name={this.state.name}
            country={this.state.country}
            weather={this.state.weather}
            weatherDesc={this.state.weatherDesc}
            temp={this.state.temp}
            feelsLike={this.state.feelsLike}
            humidity={this.state.humidity}
            pop={Math.round(parseInt(this.state.weatherHourly[0].pop * 100))}
            image={this.state.image}
          />
        </div>
        <div className="daily-div" style={{ display: displayExtraInfo }}>
          <h2 className="daily-title" style={{ display: displayExtraInfo }}>
            Daily Weather for Next 7 Days
          </h2>
          <div className="daily">
            {/* Can get index of map iteration through second paramater */}
            {this.state.weatherDaily.map((day, index) => (
              <CardDaily
                date={this.state.dates[index]}
                name={this.state.name}
                country={this.state.country}
                weather={day.weather[0].main}
                weatherDesc={day.weather[0].description}
                temp={`${Math.round(parseInt(day.temp.day) - 273.15)}°C`}
                feelsLike={`${Math.round(
                  parseInt(day.feels_like.day) - 273.15
                )}°C`}
                humidity={`${day.humidity}%`}
                pop={Math.round(parseInt(day.pop * 100))}
                image={this.weatherIcons[day.weather[0].icon]}
              />
            ))}
          </div>
        </div>
        {/*
        <h2>Hourly Weather for Next 48 Hours</h2>
        <div className="hourly">
          {this.state.weatherHourly.map(hour =>
            <CardHourly
              name={this.state.name}
              country={this.state.country}
              weather={hour.weather[0].main}
              weatherDesc={this.state.weatherDesc}
              temp={`${Math.round(parseInt(hour.temp) - 273.15)}°C`}
              feelsLike={`${Math.round(parseInt(hour.feels_like) - 273.15)}°C`}
              humidity={`${hour.humidity}%`}
              image={this.weatherIcons[hour.weather[0].icon]}
            />
          )}
        </div>
        */}
      </div>
    );
  }
}

export default App;
