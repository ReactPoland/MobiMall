import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	ScrollView,
	Alert,
	Dimensions,
	NativeModules
} from 'react-native';
import { COLOR, ThemeProvider, Button } from 'react-native-material-ui';
import routes from '../routes'
import { api, bindMethods } from '../../utils';


const ChangingButton = ({onPress, text}) => {
	return (
		<Button 
			raised 
			text={text} 
			style={{ 
				container: { 
					height: 60,
					backgroundColor: `#9100be`,
				}, 
				text: {
					fontWeight: '100', 
					fontSize: 25, 
					color: 'white' 
				} 
			}} 
			onPress={ onPress } />
	);
}

export default class NewProductSeller extends Component {

	constructor(prop) {
		super(prop);
		bindMethods(this);
		this.uiTheme = {
		    palette: {
		        primaryColor: COLOR.green500,
		    },
		    toolbar: {
		        container: {
		            height: 40,
		        },
		    },
		};
	}

	saveUserType(type) {
		return api.saveUserType(this.props.manager.getDataFB().id, type);
	}



	render() {


		return (
        <ThemeProvider uiTheme={ this.uiTheme } >

			<View style={loginStyle.container} >

				<View style={loginStyle.logoImage} >
					<Image source={ require('../../assets/img/mobimall-icon.png') } style={{ width: 60, height: 60, resizeMode: 'contain' }} />
				</View>

				<View style={{ marginBottom: 20 }}>
					<Text style={[loginStyle.textCenter]}>Please choose one{'\n'}of the following options</Text>
				</View>


				<ChangingButton text="BUYER" onPress={ () => { 
					// set buyer status
					this.props.manager.setUserProfile('buyer');
					this.props.navigator.replace( routes.dashboardBuyer ) 
				} } />
				<View style={{ marginVertical: 20 }}>
					<Text style={[loginStyle.textCenter]}>or</Text>
				</View>

				<ChangingButton text="SELLER" onPress={ () => {
					// set seller status
					this.props.manager.setUserProfile('seller');
					this.props.navigator.replace( routes.dashboardSeller ) 
				} } />

				<View style={{ marginVertical: 20 }}>
					<Text style={[loginStyle.textCenter]}>and don't worry you can{'\n'}always change your mind later</Text>
				</View>

			</View>
        </ThemeProvider>
		)
	}
}

const loginStyle = StyleSheet.create({
	logoImage: {
		marginVertical: 45,
		justifyContent: 'center',
		alignItems: 'center',
		// borderWidth: 2,
	},
	container: {
		backgroundColor: '#eee',
		flex: 1,
		paddingHorizontal: 40,
		// alignItems: 'center',
		// justifyContent: 'center',
		overflow: 'hidden',
	},
	textCenter: {
		fontSize: 18,
		color: '#000',
		textAlign: 'center',
	}
});
