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

export default class NewProductSeller extends Component {

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
		return (
			<View style={loginStyle.container} onLayout={this.onLayout}>

				<Image source={{uri: 'https://unsplash.it/400/400?image=140'}} style={loginStyle.bgImage}/>

				<View style={loginStyle.purpleShadow}>				
					<Image source={require('../../assets/img/mobimall-icon.png')} style={loginStyle.logo}/>
					<Text style={loginStyle.logoText} >MOBIMALL</Text>
				</View>
				
				<View style={loginStyle.buttonBlock}>
					
					<View style={loginStyle.button}>
						<Text style={loginStyle.buttonText} >CONNECT WITH FACEBOOK</Text>
					</View>

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