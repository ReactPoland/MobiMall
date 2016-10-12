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
	Dimensions,
	NativeModules
} from 'react-native';
import { bindMethods } from '../../utils';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';

const SaeInput = ( { label } ) => (
  <Sae
    label={label}
    iconClass={FontAwesomeIcon}
    iconName={'pencil'}
    iconColor={'white'}
    autoCapitalize={'none'}
    autoCorrect={false}
    iconColor="#777"
    labelStyle={ signUpStyle.saeLabelStyle }
    inputStyle={ signUpStyle.saeInputStyle }
  />
);

export default class SignUp extends Component {

	constructor(prop) {
		super(prop);
		bindMethods(this);
	}


	render() {

		return (
			<View style={signUpStyle.container} >
				<ScrollView>


					<View style={signUpStyle.headerBlock}>
						<TouchableNativeFeedback onPress={ () => { this.props.navigator.toLogin() } }>
							<View style={signUpStyle.cancelButton} >
								<Text style={signUpStyle.cancelButtonText}>cancel</Text>
							</View>
						</TouchableNativeFeedback>

						<Image source={require('../../assets/img/mobimall-icon.png')} style={signUpStyle.logo}/>
					</View>

					<SaeInput label="First name" />
					<SaeInput label="Last name" />
					<SaeInput label="Date of Birth" />
					<SaeInput label="Email" />
					<SaeInput label="Phone" />
					<SaeInput label="Username" />
					<SaeInput label="Password" />
					<SaeInput label="Verify Password" />
					
				</ScrollView>
			</View>
		)
	}
}

const signUpStyle = StyleSheet.create({
	cancelButton: {
		position: 'absolute',
		left: 10,
		top: 10,
	},
	cancelButtonText: {
		fontSize: 23,
		fontWeight: `bold`,
	},
	headerBlock: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		flex: 1,
		backgroundColor: `white`,
	},
	saeLabelStyle: {
		fontFamily: 'Roboto',
		fontWeight: 'normal',
		color: '#777'
	},
	saeInputStyle: {
		fontFamily: 'Roboto',
		color: 'black'
	},
	logo: {
		resizeMode: 'contain',
		height: 80,
		width: 80,
	}

});
