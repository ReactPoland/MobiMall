import React, { Component } from 'react';
import {
	Text,
	View,
	Modal,
	StyleSheet,
	TouchableNativeFeedback,
	WebView,
} from 'react-native';
import { host } from '../utils/';

export default class IGLoginPopup extends Component {

	constructor(props) {
		super(props);
		this.clientId = "c2210e89ad61429d89883206552abded";
		this.redirectUri = `${host}/redirect/?clientToken=`;
	}

	// componentDidMount() {
		// this.timer = setInterval( () => {
			// if (this.webViewRef && this.webViewRef.props &&  this.webViewRef.props.source && this.webViewRef.props.source.uri) {
				// console.log(this.webViewRef.props.source.uri);
			// }
		// } , 1000);
	// }

	// componentWillUnmount() {
		// clearInterval(this.timer);
	// }

	render() {

		let { visible, tokenMark } = this.props;

		if ( !visible || !tokenMark ) return null;

		return (
			<Modal
				visible={true}
				transparent={false}
				animationType={"fade"} 
				onRequestClose={() => { }}>
				
				<WebView
					ref={ (ref) => { this.webViewRef = ref; } }
			        source={{uri: `https://api.instagram.com/oauth/authorize/?client_id=${this.clientId}&redirect_uri=${this.redirectUri}${tokenMark}&response_type=code`}}
			        style={{marginTop: 20}}
			      />

			</Modal>
		);
	}
}
