import React, { Component } from "react";
import logo from "./onclogo_135x135_1.png";

import Container from "./components/Container";
import Header from "./components/Header";
import LoginContainer from "./components/LoginContainer";
import "./css/App.css";
import "./css/semantic.min.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { user: "", location: "CRSS" };

		this.handleLocationChange = this.handleLocationChange.bind(this);
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
		if (this.state.location === "CRSS") {
			console.log("click");
			this.setState({ location: "DISS" });
		} else {
			console.log("clack");
			this.setState({ location: "CRSS" });
		}
	};

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
					<Container className="semantic" locationCode={this.state.location} />
				</div>
			</div>
		);
	}
}

export default App;
