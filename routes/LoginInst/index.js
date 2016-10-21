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
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');
var RNInstagramOAuth = require('react-native-instagram-oauth');
import { api } from '../../utils';
import { Sae } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class NewProductSeller extends Component {

	constructor(prop) {
		super(prop);
		this.loginInst = this.loginInst.bind(this);
		this.onPersonalInfoChange = this.onPersonalInfoChange.bind(this);
		this.state = {
			instagram: {
				login: '',
				pass: ''
			}
			// mainImageSize: {
				// width: 360,
				// height: 360
			// }
		}
	}

	loginInst() {
		let that = this;
		let { login, pass } = this.state.instagram;
		
		api.loginInstagram( that.props.manager.getDataFB().id, login, pass ).then(resp => {
			if ( resp.status !== 200 ) return;
			if (resp.data.message) 
				Alert.alert(resp.data.message);
			else 
				this.props.manager.authInst( resp.data.user );
		})
		.catch(err => {
			Alert.alert(`Request error. Can't find server`);
		});

		// RNInstagramOAuth( 'c2210e89ad61429d89883206552abded', 'http://testmobimall2.herokuapp.com/redirect/', (err, access, token) => {
			// console.log( access, token );
		// });

		// FBLoginManager.setLoginBehavior( FBLoginManager.LoginBehaviors.Native );
		// FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data) {
			// if (that.props.manager.getDataFB() ) return;

			// if ( error ) {
				// Alert.alert('error');
				// console.log(error);
				// return;
			// }
			// if ( ! ( data.type === 'success' ) ) {
				// Alert.alert('Bad response');
				// return;
			// }

			// that.props.manager.authFB && that.props.manager.authFB( JSON.parse( data.profile ) );
			// api.createUser(JSON.parse(data.profile)).catch(e => console.log('e', e));
		// });

		// Alert.alert('Click');
		
		// this.props.manager.authInst({
			// firstName: 'blabla',
			// id: 123123,
		// });
	}

	onPersonalInfoChange(prop, event) {

		let newIstProfile = Object.assign({}, this.state.instagram);
		newIstProfile[prop] = event.nativeEvent.text;

		this.setState({
			instagram: newIstProfile
		});

	}

	render() {

		return (
			<View style={loginStyle.container} >

				<Image source={{uri: 'https://unsplash.it/400/400?image=140'}} style={loginStyle.bgImage}/>

				<View style={loginStyle.purpleShadow}>
					<Image source={require('../../assets/img/mobimall-icon.png')} style={loginStyle.logo}/>
					<Text style={loginStyle.logoText} >MOBIMALL</Text>
				</View>

				<View style={loginStyle.buttonBlock}>

				<TextInput
				  label={'Login'}
				  iconClass={FontAwesomeIcon}
				  iconName={'pencil'}
				  iconColor={'white'}
				  style={loginStyle.textInput}
				  autoCapitalize={'none'}
				  autoCorrect={false}
				  onChange={this.onPersonalInfoChange.bind(this, 'login')}
				  value={this.state.instagram.login}
				/>

				<TextInput
				  label={'Password'}
				  iconClass={FontAwesomeIcon}
				  iconName={'pencil'}
				  iconColor={'white'}
				  style={loginStyle.textInput}
				  autoCapitalize={'none'}
				  autoCorrect={false}
				  onChange={this.onPersonalInfoChange.bind(this, 'pass')}
				  value={this.state.instagram.pass}
				/>

					<TouchableNativeFeedback onPress={ this.loginInst }>
						<View style={loginStyle.button}>
							<Text style={loginStyle.buttonText} >CONNECT WITH INSTAGRAM</Text>
							{/*<FBLogin
							    ref={(fbLogin) => { this.fbLogin = fbLogin }}
							    loginBehavior={FBLoginManager.LoginBehaviors.Native}
							    permissions={["email","user_friends"]}
							    onLogin={function(e) {
							    	if ( ! ( e.type === 'success' ) ) return;
							    	that.props.manager.authFB && that.props.manager.authFB( e.profile );
							    	console.log(e)
							    } }
							    onLoginFound={function(e){console.log(e)}}
							    onLoginNotFound={function(e){console.log(e)}}
							    onLogout={function(e){console.log(e)}}
							    onCancel={ function(e) { } }
							    onError={ function(e) {
							    	console.log(e);
							    } }
							    onPermissionsMissing={ function(e) { console.log(e) } }
							  />*/}
						</View>
					</TouchableNativeFeedback>

				</View>


			</View>
		)
	}
}

const loginStyle = StyleSheet.create({
	logoText: {
		color: 'white',
		fontSize: 30,
		fontWeight: 'bold',
	},
	textInput: {
		backgroundColor: `rgba(255, 255, 255, 0.5)`,
	},
	logo: {
		resizeMode: 'contain',
		height: 150,
		width: 150,
	},
	buttonVertBlock: {
		flexDirection: 'row',
		height: 50,
	},
	purpleShadow: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 6,
		backgroundColor: `rgba(133, 4, 147, 0.5)`,
		zIndex:20,
	},
	bgImage: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		zIndex: 10,
	},
	postButtonView: {
		backgroundColor: 'black',
		marginRight: 20,
		marginLeft: 20,
		marginTop: 15,
		padding: 7,
	},
	buttonBlock: {
		zIndex:20,
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		backgroundColor: `rgba(84, 70, 184, 0.7)`,
	},
	buttonVert: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: `rgba(84, 70, 184, 0.7)`,
		flex: 1,
	},
	buttonText: {
		justifyContent: 'center',
		color: 'white',
		fontSize: 18,
	},
	buttName: {
		color: 'white',
		textAlign: 'center',
		fontSize: 20,
	},
	container: {
		flex: 1,
		overflow: 'hidden',
	},
	blockTitle: {
		fontWeight: 'bold',
		fontSize: 15,
		paddingTop: 5,
		paddingBottom: 5
	},
	postPageImageView: {
	},
	postPageDescView: {
		paddingTop: 20,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 20,
		backgroundColor: 'white'
	}

});
