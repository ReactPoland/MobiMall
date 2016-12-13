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
						uri: `https://api.motion.ai/webchat/19435?sendBtn=SEND&inputBox=Type+something...&token=fc15f2b7dabfeea0d0c19e2b10bad7fa`
					}} style={{
					}} />
			</View>
		)
	}
}
