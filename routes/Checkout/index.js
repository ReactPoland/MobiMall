import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet
} from 'react-native';
import { api, bindMethods } from '../../utils';

export default class Checkout extends Component {

	constructor(prop) {
		super(prop);
		bindMethods(this);
	}


	render() {

		return (
			<View style={checkout.container} >
				<Text>Checkout view</Text>
			</View>
		)
	}
}

const checkout = StyleSheet.create({
	
	container: {
		flex: 1,
		backgroundColor: `white`,
	}

});
