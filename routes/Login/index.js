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
	AsyncStorage,
	NativeModules
} from 'react-native';
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');
import Video from 'react-native-video';
import { api, bindMethods, auth0lock } from '../../utils';
import IGLoginPopup from '../../components/IGLoginPopup';
import axios from 'axios';
import routes from '../routes'
var Auth0Lock = require('react-native-lock');
var CookieManager = require('react-native-cookies');

export default class Login extends Component {

	constructor(prop) {
		super(prop);
		bindMethods(this);
		// this.onLayout = this.onLayout.bind(this);
		// this.loginFB = this.loginFB.bind(this);
		this.state = {
			loginButtonReady: true,
			popupIGVisibility: false,
			tokenMark: null,
			readyLoginView: false,
		}


		// this.state = {
			// mainImageSize: {
				// width: 360,
				// height: 360
			// }
		// }
	}

	showButton() {
		this.setState({
			loginButtonReady: true
		})
	}

	hideButton() {
		this.setState({
			loginButtonReady: false
		})
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
		this.hideButton();


		FBLoginManager.setLoginBehavior( FBLoginManager.LoginBehaviors.Native );
		FBLoginManager.loginWithPermissions(["email","user_friends", "user_about_me", 'public_profile'], async function(error, data) {

			if (that.props.manager.getDataFB() ) {
				that.showButton();
				return;
			}
			
			if ( error ) {
				that.showButton();
				Alert.alert('error');
				console.log(error);
				return;
			}
			if ( ! ( data.type === 'success' ) ) {
				that.showButton();
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
				that.showButton();
				that.props.navigator.replace( routes.profileChanging );
			}).catch(e => {
				that.showButton();
				Alert.alert('server error');
				console.log('e', e)
			});

		});
	}

	// get token mark from IG

	async showIGPopup() {

		this.hideButton();
		let respData = await api.getTokenMark().then( resp => resp.data ).catch( e => { Alert.alert( 'Server error', e.message ) } );

		if (respData) {
			if (respData.status == 'ok') {
				this.setState( { popupIGVisibility: true, tokenMark: respData.value } );
			} else {
				Alert.alert( 'Response error', respData.mess );
			}
		}
		this.showButton();
	}

	componentDidMount() {

		CookieManager.clearAll( async (err, res) => {

			let loggedId = await AsyncStorage.getItem( 'logged-igId' );
			if ( loggedId != null ) {
				api.createUser( { id: loggedId } )
				.then( async ( { data } ) => {

					if (data.status == 'ok') {
						// console.log(data.value);

						this.props.manager.authFB && this.props.manager.authFB(data.value);

						// if (data.value.type && data.value.type.length ) {
							// if ( data.value.type == "seller" ) this.props.navigator.replace( routes.dashboardSeller );
							// else this.props.navigator.replace( routes.dashboardBuyer );
						// } else {
							this.props.navigator.replace( routes.profileChanging );
						// }
					} else {
						await AsyncStorage.removeItem('logged-igId');
						this.setState({readyLoginView: true})
					}
				})
				.catch(er => { Alert.alert(er.message); this.showButton(); this.setState({readyLoginView: true}); })
			} else {
				this.setState({readyLoginView: true});
			}
		});
		
	}

	hideIGPopup() {
		this.setState({popupIGVisibility: false});
	}

	async showAuth () {

		this.hideButton();

		auth0lock.show({ 
				rememberLastLogin: false, 
				returnUrl: "http://testmobimall2.herokuapp.com/",
				returnTo: "http://testmobimall2.herokuapp.com/" 
			}, (err, profile, token) => {
				// console.log(token);
			if (err) {
				console.log( err );
				this.showButton()
				Alert.alert(err.message);
				return;
			};

			let igProfileId = 0;

			profile.identities.map(connItem => {
				if (connItem.provider == 'instagram') {
					igProfileId = connItem.userId;
				}
			});

			let newProfile = {
				id: igProfileId,
				about: profile.bio,
				email: profile.email,
				firstName: profile.name,
				lastName: `__${profile.name}__`,
				// name: profile.name,
				profileImgUri: profile.picture
			};

			// CookieManager.clearAll((err, res) => {
			  // console.log('cookies cleared!');
			  // console.log(err);
			  // console.log(res);
			// });


			api.createUser( newProfile )
				.then( async ( { data } ) => {
					this.showButton();

					if (data.status == 'ok') {

						this.props.manager.authFB && this.props.manager.authFB(data.value);
						await AsyncStorage.setItem('logged-igId', data.value.id );
						// if (data.value.type && data.value.type.length ) {
							// if ( data.value.type == "seller" ) this.props.navigator.replace( routes.dashboardSeller );
							// else this.props.navigator.replace( routes.dashboardBuyer );
						// } else {
							this.props.navigator.replace( routes.profileChanging );
						// }
					} else {
						Alert.alert('Error', data.mess);
					}
				})
				.catch(er => { Alert.alert(er.message); this.showButton(); })

		});
	}

	render() {
		
		const { Fog } = this.props;
		const { popupIGVisibility, tokenMark, readyLoginView } = this.state;

		if ( !readyLoginView ) return (
			<View>
				<Fog visible={ true } />			
			</View>
		);

		return (
			<View style={loginStyle.container} onLayout={this.onLayout}>

			<IGLoginPopup visible={ popupIGVisibility } tokenMark={ tokenMark } />

			<Fog visible={ !this.state.loginButtonReady } />

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

					<TouchableNativeFeedback onPress={ this.showAuth }>
						<View style={loginStyle.button}>
							<Text style={loginStyle.buttonText} >CONNECT WITH IG</Text>
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
				
					{/*<TouchableNativeFeedback onPress={ () => { this.props.navigator.push( routes.signUp ); } }>
						<View style={loginStyle.button}>
							<Text style={loginStyle.buttonText} >SIGN UP</Text>
						</View>
					</TouchableNativeFeedback>*/}
				
				</View>


					{/*<View style={loginStyle.buttonVertBlock}>

						<View style={loginStyle.buttonVert}>
							<Text style={loginStyle.buttonText} >LOGIN</Text>
						</View>

					</View>*/}


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
