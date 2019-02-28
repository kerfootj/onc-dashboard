import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

class DropdownLocations extends Component {
	state = {};
	render() {
		const locationOptions = [];
		Object.keys(this.props.locationOptions).forEach(index => {
			locationOptions[index] = {
				text: this.props.locationOptions[index],
				value: this.props.locationOptions[index]
			};
		});
		return (
			<Dropdown
				onChange={this.props.handleChangeLocation}
				placeholder="Select Location"
				selection
				options={locationOptions}
			/>
		);
	}
}

export default DropdownLocations;
