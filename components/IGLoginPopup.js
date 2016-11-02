import React, { Component } from 'react';
import {
	Text,
	View,
	Modal,
	StyleSheet,
	TouchableNativeFeedback,
	WebView,
} from 'react-native';

export default class IGLoginPopup extends Component {

	constructor(props) {
		super(props);
		this.clientId = "c2210e89ad61429d89883206552abded";
		this.redirectUri = "http://testmobimall2.herokuapp.com/redirect/";
	}

	render() {

		let { visible } = this.props;
		return (
			<Modal
				visible={visible}
				transparent={false}
				animationType={"fade"} 
				onRequestClose={() => { }}>
				
				<WebView
			        source={{uri: `https://api.instagram.com/oauth/authorize/?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=code`}}
			        style={{marginTop: 20}}
			      />

			</Modal>
		);
	}
}
