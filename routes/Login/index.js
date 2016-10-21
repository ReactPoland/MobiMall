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
import Video from 'react-native-video';
import { api } from '../../utils';
import axios from 'axios';
import routes from '../routes'

export default class Login extends Component {

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
			.then( (responseJson) => responseJson.data.bio )
			.catch( e => console.log('about error') );

			let profile = Object.assign({}, {
				id:JSON.parse(data.profile).id,
				about: about,
				email: JSON.parse(data.profile).email,
				firstName: JSON.parse(data.profile).first_name,
				lastName: JSON.parse(data.profile).last_name,
				name: JSON.parse(data.profile).name,
				profileImgUri: JSON.parse(data.profile).picture.data.url
			} );

			that.props.manager.authFB && that.props.manager.authFB( profile );
			api.createUser( profile ).then(() => {
				that.props.navigator.push( routes.profileChanging );
			}).catch(e => console.log('e', e));

		});
	}

	render() {

		return (
			<View style={loginStyle.container} onLayout={this.onLayout}>

			<Image 
				source={ { uri: 'http://bestanimations.com/Animals/Birds/Penguins/Penguin-cartoon-animation.gif' } }
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					zIndex: 10,
					resizeMode: 'cover'
				}} />

				{/*<Video source={ {uri: 'http://testmobimall2.herokuapp.com/loginbackground.mp4'  } }   // Can be a URL or a local file.
				       rate={1.0}                     // 0 is paused, 1 is normal.
				       volume={1.0}                   // 0 is muted, 1 is normal.
				       muted={false}                  // Mutes the audio entirely.
				       paused={false}                 // Pauses playback entirely.
				       resizeMode="cover"             // Fill the whole screen at aspect ratio.
				       repeat={true}                  // Repeat forever.
				       playInBackground={false}       // Audio continues to play when app entering background.
				       playWhenInactive={false}       // [iOS] Video continues to play when control or notification center are shown.
				       progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
				       style={loginStyle.backgroundVideo} />*/}

				<View style={loginStyle.purpleShadow}>
					<View style={loginStyle.logoWrap}>
							<Image source={require('../../assets/img/mobimall-icon.png')} style={loginStyle.logo}/>						
							<Text style={loginStyle.logoText} >MOBIMALL</Text>
					</View>

					{/*https://video-fra3-1.xx.fbcdn.net/v/t42.4659-2/14495702_916960405076035_385499260713435136_n.mp4?oh=c1a63d2be4e961155ec8d047a24fbf43&oe=57FD25A3*/}


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



					{/*<View style={loginStyle.buttonVertBlock}>

						<View style={loginStyle.buttonVert}>
							<Text style={loginStyle.buttonText} >LOGIN</Text>
						</View>

					</View>*/}

					<TouchableNativeFeedback onPress={ () => { this.props.navigator.push( routes.signUp ); } }>
						<View style={loginStyle.button}>
							<Text style={loginStyle.buttonText} >SIGN UP</Text>
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
	backgroundVideo: {
    	position: 'absolute',
    	top: 0,
    	left: 0,
    	bottom: 0,
    	right: 0,
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
		alignItems: 'center',
		flex: 6,
		// backgroundColor: `rgba(133, 4, 147, 0.5)`,
		zIndex:20,
	},
	logoWrap: {
		// borderColor: `white`,
		// borderStyle: 'solid',
		// borderWidth: 1,
		paddingTop: 50
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
		paddingLeft: 35,
		paddingRight: 35,
		marginBottom: 15,
		zIndex:20,
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		backgroundColor: `rgba(84, 70, 184, 0.7)`,
		marginBottom: 10,
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
