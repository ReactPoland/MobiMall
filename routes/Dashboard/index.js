import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	TextInput,
	TouchableNativeFeedback,
	ScrollView,
	Alert,
	Dimensions
} from 'react-native';

export default class Dashboard extends Component {

	constructor(prop) {
		super(prop);
		this.onLayout = this.onLayout.bind(this);
		// this.state = {
			// mainImageSize: {
				// width: 360,
				// height: 360
			// }
		// }
	}

	onLayout(event) {

		// let { width, height } = event.nativeEvent.layout;

		// this.setState({
			// mainImageSize: {
				// width: width,
				// height: width,
			// }
		// });
		// this.refs['scrolView'].scrollTo({x: 0,y :0, animated: false});


	}

	render() {
		let that = this;
		let { name:profileName } = this.props.manager.getDataFB();

		return (
			<View style={dashboardStyle.container} onLayout={this.onLayout}>

				<View style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}} >
					<Text style={{
						fontSize: 20
					}} >
						Hello { profileName }, {'\n'}
						this is your dashboard.
					</Text>
				</View>

				<View style={dashboardStyle.menuStripeBlock}>
					<Image source={require('../../assets/img/mobimall-icon.png')} style={dashboardStyle.logoMini}/>

					<View style={dashboardStyle.menuStripeContent}>

						<TouchableNativeFeedback onPress={ () => {this.props.navigator.toBuyerProfile(); } }>
							<View style={dashboardStyle.iconWrap}>
								<Image source={require('../../assets/img/ic_settings.png')} style={dashboardStyle.stripeIcon}/>
							</View>
						</TouchableNativeFeedback>


						<TouchableNativeFeedback onPress={ () => {this.props.navigator.toSellerProfile(); } }>
							<View style={dashboardStyle.iconWrap}>
								<Image source={require('../../assets/img/ic_settings.png')} style={dashboardStyle.stripeIcon}/>
							</View>
						</TouchableNativeFeedback>

						<TouchableNativeFeedback onPress={ () => {this.props.navigator.toBuyerProfile(); } }>
							<View style={dashboardStyle.iconWrap}>
								<Image source={require('../../assets/img/ic_settings.png')} style={dashboardStyle.stripeIcon}/>
							</View>
						</TouchableNativeFeedback>

					</View>
				</View>

			</View>
		)
	}
}

const dashboardStyle = StyleSheet.create({
	iconWrap: {
		marginRight: 35,
	},
	icon: {
		height: 40,
		width: 40,
	},
	menuStripeBlock: {
		height: 80,
	},
	logoMini: {
		resizeMode: 'contain',
		width: 60,
		height: 60,
		position: 'absolute',
		left: 30,
		zIndex: 10,
	},
	menuStripeContent: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 60,
		backgroundColor: `rgba(133, 4, 147, 0.5)`,
		marginLeft: 60,
		paddingLeft: 40,
	},
	container: {
		flex: 1,
		overflow: 'hidden',
	},




});
