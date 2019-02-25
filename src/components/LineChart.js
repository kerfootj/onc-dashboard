import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class LineChart extends Component {
	render() {
		return <Line data={this.props.data} />;
	}
}

export default LineChart;
