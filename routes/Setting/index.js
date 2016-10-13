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
import CheckBox from 'react-native-checkbox';
 import { Button } from 'react-native-material-design';

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
    iconSize={10}
  />
);

export default class Setting extends Component {

	constructor(prop) {
		super(prop);
		bindMethods(this);

		this.state = {
			fields: {}
		}
	}

	changeField(fieldName, val) {

		let newFields = Object.assign({}, this.state.fields );
		newFields[fieldName] = val;
		this.setState( { fields:newFields } );
	}


	render() {

		const { fields } = this.state;

		return (
			<View style={signUpStyle.container} >
				<ScrollView style={signUpStyle.scrollContainer}>


					<View style={signUpStyle.headerBlock}>
						<TouchableNativeFeedback onPress={ () => { this.props.navigator.toLogin() } }>
							<View style={signUpStyle.cancelButton} >
								<Text style={signUpStyle.cancelButtonText}>cancel</Text>
							</View>
						</TouchableNativeFeedback>

						<Image source={require('../../assets/img/mobimall-icon.png')} style={signUpStyle.logo}/>
					</View>


					<SaeInput 
						label="First name" 
						value={fields.firstName} 
						onChange={ (e) => this.changeField.call( this, 'firstName', e.nativeEvent.text ) } />
					
					<SaeInput 
						label="Last name"  
						value={fields.lastName} 
						onChange={ (e) => this.changeField.call( this, 'lastName', e.nativeEvent.text ) } />
					
					<SaeInput 
						label="Date of Birth" 
						value={fields.dateBirth} 
						onChange={ (e) => this.changeField.call( this, 'dateBirth', e.nativeEvent.text ) } />
					
					<SaeInput 
						label="Email" 
						value={fields.email} 
						onChange={ (e) => this.changeField.call( this, 'email', e.nativeEvent.text ) } />
					
					<SaeInput 
						label="Phone" 
						value={fields.phone} 
						onChange={ (e) => this.changeField.call( this, 'phone', e.nativeEvent.text ) } />
					
					<SaeInput 
						label="Username" 
						value={fields.username} 
						onChange={ (e) => this.changeField.call( this, 'username', e.nativeEvent.text ) } />
					
					<SaeInput 
						label="Password" 
						value={fields.password} 
						onChange={ (e) => this.changeField.call( this, 'password', e.nativeEvent.text ) } />
					
					<SaeInput 
						label="Verify Password" 
						value={fields.verifyPassword} 
						onChange={ (e) => this.changeField.call( this, 'verifyPassword', e.nativeEvent.text ) } />

					<View style={signUpStyle.rememberBlock}>

						<View style={signUpStyle.rememberTextWrap} >
							<Text style={signUpStyle.rememberText}>Remember Me</Text>
						</View>
						
						<View style={signUpStyle.checkBoxBlock} >
							<CheckBox
								label=" "
								checked={fields.rememberMe}
							    onChange={ (checked) => this.changeField.call(this, 'rememberMe', checked ) }
							/>
						</View>

					</View>

					<View style={signUpStyle.createAccBlock}>

						<TouchableNativeFeedback onPress={ () => Alert.alert('click handler') } >
							<View style={signUpStyle.creatAccButtBg}>
								<Text style={ signUpStyle.creatAccButtText } >Create Account</Text>
							</View>
						</TouchableNativeFeedback>

					</View>

					
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
	checkBoxBlock: {
		justifyContent: 'flex-end',
	},
	createAccBlock: {
		marginBottom: 35,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 15,
	},
	creatAccButtText: {
		color: '#fff',
		fontSize: 25,
	},
	creatAccButtBg: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#777',
		height:50, 
	},
	rememberTextWrap: {
		
		justifyContent: 'flex-end',
		marginRight: 15,
	},
	rememberBlock: {
		marginTop: 20,
		flexDirection: 'row'
	},
	rememberText: {
		fontSize: 25,
		color: 'purple',
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
	},
	scrollContainer: {
		paddingLeft: 20,
		paddingRight: 20,		
	}

});
