import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { Line } from "react-chartjs-2";

class Chart extends Component {
	state = {
		locationCode: "",
		data: {},
		sensorName: "",
		color: "#420666",
		loading: true,
		error: false
	};

	componentDidMount() {
		this.getScalarData(this.props.locationCode, this.props.sensorCode);
	}

	componentDidUpdate(prevProps) {
		if (this.props.locationCode !== prevProps.locationCode) {
			this.getScalarData(this.props.locationCode);
		}
	}

	render() {
		const chartDataset = [];
		const chartLabels = [];

		Object.keys(this.state.data).forEach(index => {
			chartDataset[index] = this.state.data[index].value;
			chartLabels[index] = moment(this.state.data[index].sampleTime).format("ddd, HH:mm");
		});

		const chartData = {
			labels: chartLabels,
			datasets: [
				{
					label: this.state.sensorName + " " + this.state.locationCode,
					borderColor: this.state.color,
					fill: false,
					data: chartDataset
				}
			]
		};

		return (
			<div className="ui eight wide column" key={1}>
				<div className="ui segment">
					<button onClick={() => this.handleClickColor()}>Color</button>
					<Line data={chartData} />
				</div>
			</div>
		);
	}

	getScalarData(locationCode, sensorCode) {
		axios
			.get("https://data.oceannetworks.ca/api/scalardata", {
				params: {
					method: "getByLocation",
					token: "079f20e6-4fc3-41ab-832e-a42943f59186",
					locationCode: locationCode,
					deviceCategoryCode: "METSTN",
					sensorCategoryCodes: sensorCode,
					outputFormat: "Object",
					dateFrom: moment()
						.subtract(30, "minutes")
						.toISOString(),
					rowLimit: 100
				},
				headers: { "content-type": "application/x-www-form-urlencoded" }
			})
			.then(response => {
				// console.log(response);
				this.setState({
					locationCode: locationCode,
					data: response.data.sensorData[0].data,
					sensorName: response.data.sensorData[0].sensorName,
					loading: false
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

	handleClickColor = () => {
		this.setState({ color: "ff0000" });
		this.getScalarData(this.state.locationCode);
	};

	// <button onClick={() => this.handleClickLocation()}>Location</button>
	// handleClickLocation = () => {
	// 	this.getScalarData("DISS");
	// };
}

export default Chart;

// Test URL's
// https://data.oceannetworks.ca/api/locations?method=get&token=079f20e6-4fc3-41ab-832e-a42943f59186&deviceCategoryCode=METSTN
