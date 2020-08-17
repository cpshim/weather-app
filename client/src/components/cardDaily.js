import React from "react";

export default class CardDaily extends React.Component {
  render() {
    return (
      <div className="weather-card-daily">
        <p>{this.props.date}</p>
        <p className="top-text">{this.props.weatherDesc}</p>
        <img
          className="icon"
          src={this.props.image}
          style={{ width: 150, height: 150 }}
          alt="weather-icon"
        />
        <p className="bottom-text">Temperature: {this.props.temp}</p>
        <p>Feels Like: {this.props.feelsLike}</p>
        <p>Humidity: {this.props.humidity}</p>
        <p>P.O.P: {this.props.pop}%</p>
      </div>
    );
  }
}
