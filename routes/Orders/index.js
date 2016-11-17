import React, { Component } from 'react';
import {
	View,
	WebView
} from 'react-native';
import { bindMethods } from '../../utils';

export default class SignUp extends Component {

	constructor(prop) {
		super(prop);
		bindMethods(this);
	}

	render() {

		return (
			<View style={{flex: 1, backgroundColor: '#fff'}}>
				<WebView
					// automaticallyAdjustContentInsets={false}
					source={{
						uri: `https://adminmobimall.herokuapp.com/ecommerce-orders`
					}} style={{
					}} />
			</View>
		)
	}
}
