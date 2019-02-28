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
		this.state = { user: "", location: "", locationCodes: [] };

		this.handleLocationChange = this.handleLocationChange.bind(this);
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
						user={this.state.user}
						handleLogout={() => this.setUser("")}
						handleLocationChange={() => this.setLocation()}
					/>
					<Container
						className="semantic"
						locationCode={this.state.location}
					/>
				</div>
			</div>
		);
	}

	handleLocationChange() {
		if (this.state.location === "CRSS") {
			console.log("click");
			this.setState({ location: "DISS" });
		} else {
			console.log("clack");
			this.setState({ location: "CRSS" });
		}
	}

	setUser = user => {
		this.setState({ user: user });
	};

	setLocation = () => {
		let index = this.state.index;
		index = (index + 1) % this.state.locationCodes.length;
		this.setState({
			index: index,
			location: this.state.locationCodes[index]
		});
	};

	// https://data.oceannetworks.ca/api/locations?method=get&token=079f20e6-4fc3-41ab-832e-a42943f59186&

	getlocationCodes() {
		axios
			.get("https://data.oceannetworks.ca/api/locations", {
				params: {
					method: "get",
					token: "43b478f3-8f59-41e8-a24b-fa52eb3ad01f",
					deviceCategoryCode: "METSTN"
				},
				headers: { "content-type": "application/x-www-form-urlencoded" }
			})
			.then(response => {
				console.log(response);
				let locationCodes = [];

				Object.keys(response.data).forEach(index => {
					locationCodes[index] = response.data[index].locationCode;
				});

				// console.log(locationCodes);
				this.setState({
					index: 0,
					location: locationCodes[0],
					locationCodes: locationCodes
				});
			})
			.catch(error => {
				console.log(error);
				// this.setState({
				// 	loading: false,
				// 	error: true
				// });
			});
	}
}

export default App;
