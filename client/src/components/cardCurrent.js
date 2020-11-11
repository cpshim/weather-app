import React from "react";
import { Doughnut } from "react-chartjs-2";

export default class CardCurrent extends React.Component {
  render() {
    let humidity = this.props.humidity;
    humidity = humidity.replace("%", "");
    return (
      <div className="weather-card-current">
        <p style={{ marginTop: 15, marginBottom: 0, fontSize: 30 }}>
          {this.props.name}, {this.props.country}
        </p>
        <div className="card-current-div">
          <img
            className="icon"
            src={this.props.image}
            style={{ width: 150, height: 150 }}
            alt="weather-icon"
          />
          <p style={{ margin: 0 }}>{this.props.temp}</p>
        </div>
        <p className="top-text" style={{ fontSize: 25, marginTop: 0 }}>
          {this.props.weatherDesc}
        </p>
        <p>Feels Like: {this.props.feelsLike}</p>
        <div className="graph-div">
          <div>
            <Doughnut
              data={{
                datasets: [
                  {
                    backgroundColor: ["#61dafb"],
                    data: [parseInt(humidity), 100 - parseInt(humidity)],
                  },
                ],
              }}
              width={500}
              options={{
                cutoutPercentage: 80,
                responsive: true,
                tooltips: {
                  enabled: false,
                },
              }}
            />
            <p style={{ fontSize: 20, marginTop: 10 }}>
              Humidity: {this.props.humidity}
            </p>
          </div>
          <div>
            <Doughnut
              data={{
                datasets: [
                  {
                    backgroundColor: ["#61dafb"],
                    data: [this.props.pop, 100 - this.props.pop],
                  },
                ],
              }}
              width={500}
              options={{
                cutoutPercentage: 80,
                tooltips: {
                  enabled: false,
                },
              }}
            />
            <p style={{ fontSize: 20, marginTop: 10 }}>
              P.O.P: {this.props.pop}%
            </p>
          </div>
        </div>
      </div>
    );
  }
}
