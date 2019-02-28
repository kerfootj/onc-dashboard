import React, { Component } from "react";
import moment from "moment";
import axios from "axios";

class Image extends Component {
	state = {
		imageSource: "",
		loading: true,
		error: false
	};

	componentDidMount() {
		this.getImage(this.props.locationCode);
	}

	componentDidUpdate(prevProps) {
		if (this.props.locationCode !== prevProps.locationCode) {
			this.getImage(this.props.locationCode);
		}
	}

	render() {
		return (
			<div className="ui eight wide column">
				{this.state.error && this.state.loading && (
					<div className="ui segment">Sorry couldn't find an image at this location</div>
				)}
				{!this.state.error && !this.state.loading && (
					<div className="ui segment">
						<img
							src={this.state.imageSource}
							alt="loading..."
							style={{ width: "100%" }}
						/>
						<p>The latest image from {this.props.locationCode}</p>
					</div>
				)}
			</div>
		);
	}

	getImage(locationCode) {
		axios
			.get(
				"https://cors-anywhere.herokuapp.com/https://data.oceannetworks.ca/api/archivefiles",
				{
					params: {
						method: "getListByLocation",
						token: "43b478f3-8f59-41e8-a24b-fa52eb3ad01f",
						locationCode: locationCode,
						deviceCategoryCode: "VIDEOCAM",
						dateFrom: moment()
							.subtract(60, "minutes")
							.toISOString(),
						rowLimit: 25
					},
					headers: { "content-type": "application/x-www-form-urlencoded" }
				}
			)
			.then(response => {
				const files = response.data.files.filter(elem => {
					return /\.(jpe?g|png|gif)$/i.test(elem);
				});
				let error = false;
				if (files[files.length - 1] === undefined) {
					error = true;
				}
				this.setState({
					imageSource:
						"https://data.oceannetworks.ca/api/archivefiles?method=getFile&token=079f20e6-4fc3-41ab-832e-a42943f59186&filename=" +
						files[files.length - 1],
					loading: false,
					error: error
				});
			})
			.catch(error => {
				console.log(error);
				this.setState({
					error: true
				});
			});
	}
}

export default Image;
