import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import Chart from "./Chart.js";
import Image from "./Image";

class Container extends Component {
	state = {
		clicked: false,
		locationCode: "CRSS",
		sensorCodes: []
	};

	componentDidMount() {
		axios
			.get("https://data.oceannetworks.ca/api/scalardata", {
				params: {
					method: "getByLocation",
					token: "079f20e6-4fc3-41ab-832e-a42943f59186",
					locationCode: this.state.locationCode,
					deviceCategoryCode: "METSTN",
					outputFormat: "Object",
					dateFrom: moment()
						.subtract(30, "minutes")
						.toISOString(),
					rowLimit: 100
				},
				headers: { "content-type": "application/x-www-form-urlencoded" }
			})
			.then(response => {
				console.log(response);
				Object.keys(response.data.sensorData).map(index => {
					this.state.sensorCodes[index] = response.data.sensorData[index].sensorCode;
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		return (
			<div className="ui container">
				<button onClick={() => this.handleClickLocation()}>
					{this.state.locationCode}
				</button>
				<div className="ui padded grid">
					<Image />
					<Chart
						locationCode={this.state.locationCode}
						sensorCode={this.state.sensorCodes[2]}
						key={this.state.sensorCodes[2]}
					/>
					);
				</div>
			</div>
		);
	}

	handleClickLocation = () => {
		if (this.state.clicked) {
			this.setState({ locationCode: "CRSS", clicked: false });
		} else {
			this.setState({ locationCode: "DISS", clicked: true });
		}
	};
}

export default Container;

// {this.state.sensorCode.forEach(index => {
//   return (
//     <Chart
//       locationCode={this.state.locationCode}
//       sensorCode={this.state.sensorCode[index]}
//       key={this.state.sensorCode[index]}
//     />
//   );
// })}
