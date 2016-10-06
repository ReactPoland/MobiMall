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
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');
import { api } from '../../utils';
import axios from 'axios';


export default class NewProductSeller extends Component {

	constructor(prop) {
		super(prop);
		this.onLayout = this.onLayout.bind(this);
		this.loginFB = this.loginFB.bind(this);
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

	loginFB() {
		let that = this;


		FBLoginManager.setLoginBehavior( FBLoginManager.LoginBehaviors.Native );
		FBLoginManager.loginWithPermissions(["email","user_friends", "user_about_me", 'public_profile'], async function(error, data) {

			if (that.props.manager.getDataFB() ) return;

			if ( error ) {
				Alert.alert('error');
				console.log(error);
				return;
			}
			if ( ! ( data.type === 'success' ) ) {
				Alert.alert('Bad response');
				return;
			}

			let about = await axios({
				method: 'get',
				url: `https://graph.facebook.com/me?fields=id,name,bio&access_token=${data.credentials.token}`,
			})
			.then( (responseJson) => responseJson.data.bio );

			let profile = Object.assign({}, JSON.parse( data.profile ), { about } );

			that.props.manager.authFB && that.props.manager.authFB( profile );
			api.createUser(JSON.parse(data.profile)).catch(e => console.log('e', e));



		});
	}

	render() {


		return (
			<View style={loginStyle.container} onLayout={this.onLayout}>

				<Image source={{uri: 'https://unsplash.it/400/400?image=140'}} style={loginStyle.bgImage}/>

				<View style={loginStyle.purpleShadow}>
					<Image source={require('../../assets/img/mobimall-icon.png')} style={loginStyle.logo}/>
					<Text style={loginStyle.logoText} >MOBIMALL</Text>
				</View>

				<View style={loginStyle.buttonBlock}>

					<TouchableNativeFeedback onPress={ this.loginFB }>
						<View style={loginStyle.button}>
							<Text style={loginStyle.buttonText} >CONNECT WITH FACEBOOK</Text>
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



					<View style={loginStyle.buttonVertBlock}>

						<View style={loginStyle.buttonVert}>
							<Text style={loginStyle.buttonText} >LOGIN</Text>
						</View>

						<View style={loginStyle.buttonVert}>
							<Text style={loginStyle.buttonText} >SIGN UP</Text>
						</View>

					</View>

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
