import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default class MyScene extends Component {
	static get defaultProps() {
		return {
			title: 'MyScene'
		};
	}

	render() {

		console.log(this.props);
		return (
			<View>
				<Text>Current Scene: {this.props.title}.</Text>
				
				<TouchableHighlight onPress={this.props.onForward}>
					<Text>Tap me to load the next scene</Text>
				</TouchableHighlight>

				<TouchableHighlight onPress={this.props.onBack}>
					<Text>Tap me to go back</Text>
				</TouchableHighlight>

			</View>
		)
	}
}