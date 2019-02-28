import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import Chart from "./Chart.js";
import Image from "./Image";

class Container extends Component {
	state = {
		locationCode: "",
		data: {},
		sensorCodes: [],
		clicked: false,
		loading: true,
		error: false
	};

	componentDidMount() {
		this.getScalarData(this.props.locationCode);
	}

	componentDidUpdate(prevProps) {
		if (this.props.locationCode !== prevProps.locationCode) {
			this.getScalarData(this.props.locationCode);
		}
	}

	render() {
		return (
			<div className="ui container">
				<div className="ui padded grid">
					{this.state.error && <div>Sorrty couldn't find any data for this location</div>}
					{!this.state.error && (
						<React.Fragment>
							<Image locationCode={this.state.locationCode} />
							{this.state.loading && (
								<div className="ui eight wide column">
									Loading...
									<div className="ui inline text loader">
										Loading your dashboard...
									</div>
								</div>
							)}
							{Object.keys(this.state.data).map(index => {
								return (
									<Chart
										data={this.state.data[index].data}
										sensorCode={this.state.data[index].sensorCode}
										sensorName={this.state.data[index].sensorName}
										locationCode={this.state.locationCode}
										unitsOfMeasre={this.state.data[index].unitsOfMeasre}
										key={this.state.data[index].sensorCode}
									/>
								);
							})}
						</React.Fragment>
					)}
				</div>
			</div>
		);
	}

	getScalarData(locationCode) {
		axios
			.get(
				"https://cors-anywhere.herokuapp.com/https://data.oceannetworks.ca/api/scalardata",
				{
					params: {
						method: "getByLocation",
						token: "43b478f3-8f59-41e8-a24b-fa52eb3ad01f",
						locationCode: locationCode,
						deviceCategoryCode: "METSTN",
						outputFormat: "Object",
						dateFrom: moment()
							.subtract(30, "minutes")
							.toISOString(),
						rowLimit: 100
					},
					headers: { "content-type": "application/x-www-form-urlencoded" }
				}
			)
			.then(response => {
				console.log(response);
				let error = false;
				if (response.data.sensorData === null) {
					error = true;
				}
				this.setState({
					data: response.data.sensorData,
					locationCode: locationCode,
					loading: false,
					error: error
				});
			})
			.catch(error => {
				console.log(error);
				this.setState({
					loading: false,
					error: true
				});
			});
	}
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
