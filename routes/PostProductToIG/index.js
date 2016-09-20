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
		this.state = {
			mainImageSize: {
				width: 360,
				height: 360
			} 
		}
	}

	onLayout(event) {

		let { width, height } = event.nativeEvent.layout;
		let newWidth = width,
			newHeight = height;
		
		if ( width > height ) { // vertical
			newWidth = height;
			newHeight = width;
		}

		this.setState({
			mainImageSize: {
				width: newWidth,
				height: newHeight,
			}
		})

	}

	render() {
		return (
			<View style={postStyle.container} onLayout={this.onLayout}>

					<ScrollView >

						<Image ref={'image'} source={{uri: 'https://unsplash.it/400/400?image=149'}} style={{
							width: this.state.mainImageSize.width,
							height: this.state.mainImageSize.height,
						}}/>
							
						<View style={postStyle.postPageDescView} >
							<Text style={postStyle.blockTitle} >ADD NEW PRODUCT</Text>
							

							<Text style={postStyle.textInput} >
							_MM_28qt9ue_xP653_{'\n'}Nike hyperAdapt {'\n'}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
							_MM_28qt9ue_xP653_{'\n'}Nike hyperAdapt {'\n'}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
							</Text>

							<TouchableNativeFeedback
								onPress={() => {
									console.log('begin');
								}} > 
								<View style={postStyle.postButtonView} >
									<Text style={postStyle.buttName} >POST TO INSTAGRAM</Text>
								</View>
							</TouchableNativeFeedback>
						</View>
					</ScrollView>

			</View>
		)
	}
}

const postStyle = StyleSheet.create({
	postButtonView: {
		backgroundColor: 'black',
		marginRight: 20,
		marginLeft: 20,
		marginTop: 15,
		padding: 7,
	},
	buttName: {
		color: 'white',
		textAlign: 'center',
		fontSize: 20,
	},
	container: {
		flex: 1
	},
	blockTitle: {
		fontWeight: 'bold',
		fontSize: 15,
		paddingTop: 5,
		paddingBottom: 5
	},
	// postImage: {
		// width: 360,
		// height: 360,
    	// resizeMode: 'cover',
	// },
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