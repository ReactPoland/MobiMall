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
		this.state = { showFog: 0 }
	}

	hideFog() {
		this.setState({showFog: this.state.showFog - 1 });
	}

	showFog() {
		this.setState({showFog: this.state.showFog + 1 });
	}

	render() {

		let { Fog } = this.props;

		return (
			<View style={{flex: 1, backgroundColor: '#fff'}}>
			<Fog visible={this.state.showFog > 0 } />

				<WebView
					startInLoadingState= {true}
					domStorageEnabled={true}
					// automaticallyAdjustContentInsets={false}
					source={{
						uri: `https://adminmobimall.herokuapp.com/ecommerce-orders`
					}} style={{
					}} />
			</View>
		)
	}
}
