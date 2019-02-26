import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { Line } from "react-chartjs-2";

class Chart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: props.data,
			sensorCode: props.sensorCode,
			sensorName: props.sensorName,
			locationCode: props.locationCode,
			units: props.unitsOfMeasure,
			color: "#420666",
			clicked: false
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.data !== prevProps.data) {
			this.setState({
				data: this.props.data,
				sensorCode: this.props.sensorCode,
				sensorName: this.props.sensorName,
				locationCode: this.props.locationCode,
				units: this.props.unitsOfMeasure
			});
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

	handleClickColor = () => {
		if (!this.state.clicked) this.setState({ color: "#ff0000", clicked: true });
		else this.setState({ color: "#420666", clicked: false });
	};
}

export default Chart;

// Test URL's
// https://data.oceannetworks.ca/api/locations?method=get&token=079f20e6-4fc3-41ab-832e-a42943f59186&deviceCategoryCode=METSTN
