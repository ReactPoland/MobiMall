import React, { Component } from 'react';
import { 
	Text, 
	View, 
	StyleSheet, 
	Image,
	TextInput,
	TouchableNativeFeedback,
	ScrollView
} from 'react-native';

export default class NewProductSeller extends Component {
	render() {
		return (
			<View style={st.container}>
				
				<View style={ st.titleView } >
					<Image source={{uri: 'https://unsplash.it/600/100?image=147'}} style={st.imgTitle}/>
					<Text style={ st.titleText } >SHOP NAME</Text>
				</View>
					
				<View style={st.contentWrap}>
					<Text style={st.blockTitle} >ADD NEW PRODUCT</Text>
					

					<Text style={st.textInput} >Product name</Text>
					<TextInput 
						style={st.input} 
						placeholder={'Mens Brogue Shoe'} 
						underlineColorAndroid="#edb4ff" 
						placeholderTextColor='#cccccc'
						/>

					<Text style={st.textInput} >Category</Text>
					
					<TextInput 
						style={st.input} 
						placeholder={'Shoes'} 
						placeholderTextColor='#cccccc'
						underlineColorAndroid="#edb4ff" />

					<Text style={st.textInput} >Description</Text>
					
					<View style={st.inputMultiWrap}>
						<TextInput 
							style={st.inputMulti} 
							placeholder={'Populated by my facebook profile'} 
							multiline = {true} 
							placeholderTextColor='#b6b6b6'
							underlineColorAndroid="transparent" 
							numberOfLines = {4} />
					</View>
				</View>

				<View style={st.contentWrap}>
					<View style={st.lineView}>
						<Text style={st.buttonDescription} >ADD PRODUCT IMAGE</Text>
						<TouchableNativeFeedback
							onPress={() => {
								console.log('begin');
							}} > 
							<View style={st.squareBorderButton} >
								<Text style={st.buttName} >IMAGE ICON BUTTON</Text>
							</View>
						</TouchableNativeFeedback>
					</View>

				</View>

			</View>
		)
	}
}


const st = StyleSheet.create({
	titleView: {
		justifyContent: 'center',
		height: 80,
	},
	titleText: {
		zIndex: 20,
		color: 'white',
		textAlign: 'center',
		fontSize: 36,
		textShadowColor: 'black',
		textShadowRadius: 10,
		textShadowOffset: { width: 3, height: 3 }
	},
	imgTitle: {
		zIndex: 10,
		flex: 1,
    	resizeMode: 'cover',
    	top: 0,
    	left: 0,
    	right: 0,
    	bottom: 0,
    	position: 'absolute',
    },
	container: {
		justifyContent: 'center',
		// alignItems: 'center',
		backgroundColor: '#9100be',
	},
	squareBorderButton: {
		marginRight: 15,
		borderWidth: 1,
		justifyContent: 'center',
		borderStyle: 'solid',
		borderColor: '#888888',
		width: 80,
		height: 80,
		borderRadius: 10
	},
	buttName: {
		fontWeight: 'bold',
		fontSize: 15,
		color: '#9100be',
		textAlign: 'center'		
	},
	buttonDescription: {
		flex: 2,
		fontSize: 15,
		color: '#9100be',
		textAlign: 'center'
	},
	blockTitle: {
		fontSize: 15,
		color: '#9100be',
		textAlign: 'center'
	},
	lineView: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row'
	},
	textInput: {
		fontSize: 10,
		color: '#9100be'
	},
	contentWrap: {
		backgroundColor: 'white',
		marginTop: 20,
		marginLeft: 5,
		marginRight: 5,
		paddingTop: 10,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 20
	},
	input: {
		alignSelf: 'stretch',
		borderWidth: 0,
		height: 40,
	},
	inputMulti: {
		textAlignVertical: 'top',
		alignSelf: 'stretch',
		borderWidth: 0,	
	},
	inputMultiWrap: {
		marginTop: 20,
		alignSelf: 'stretch',
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#888888',
	}
})