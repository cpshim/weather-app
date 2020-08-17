import React from "react";

export default class Card extends React.Component {
  render() {
    return (
      <div className="weather-card">
        <p>
          {this.props.name}, {this.props.country}
        </p>
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
