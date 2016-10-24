import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet
} from 'react-native';

export default class Checkout extends Component {

	constructor(prop) {
		super(prop);
		bindMethods(this);
	}


	render() {

		const { fields } = this.state;

		return (
			<View style={setting.container} >
				<Text>Checkout view</Text>
			</View>
		)
	}
}

const setting = StyleSheet.create({
	
	container: {
		flex: 1,
		backgroundColor: `white`,
	}

});
