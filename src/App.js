import React, { Component } from "react";
import logo from "./onclogo_135x135_1.png";
import axios from "axios";
import Container from "./components/Container";
import Header from "./components/Header";
import "./css/App.css";
import "./css/semantic.min.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { user: "", location: "select", locationCodes: [] };
	}

	componentDidMount() {
		this.getlocationCodes();
	}

	render() {
		return (
			<div className="root">
				<div>
					<Header
						logo={logo}
						locationOptions={this.state.locationCodes}
						user={this.state.user}
						handleLogout={() => this.setUser("")}
						handleChangeLocation={this.handleChangeLocation}
					/>
					{this.state.location === "select" && (
						<div>Select a location from the dropdown to get started</div>
					)}
					{this.state.location !== "select" && (
						<Container className="semantic" locationCode={this.state.location} />
					)}
				</div>
			</div>
		);
	}

	handleChangeLocation = (event, data) => {
		console.log(data.value);
		this.setState({ location: data.value });
	};

	setUser = user => {
		this.setState({ user: user });
	};

	// https://data.oceannetworks.ca/api/locations?method=get&token=079f20e6-4fc3-41ab-832e-a42943f59186&

	getlocationCodes() {
		axios
			.get(
				"https://cors-anywhere.herokuapp.com/https://data.oceannetworks.ca/api/locations",
				{
					params: {
						method: "get",
						token: "43b478f3-8f59-41e8-a24b-fa52eb3ad01f",
						deviceCategoryCode: "METSTN"
					},
					headers: { "content-type": "application/x-www-form-urlencoded" }
				}
			)
			.then(response => {
				console.log(response);
				let locationCodes = [];

				Object.keys(response.data).forEach(index => {
					locationCodes[index] = response.data[index].locationCode;
				});

				this.setState({
					locationCodes: locationCodes
				});
			})
			.catch(error => {
				console.log(error);
			});
	}
}

export default App;
