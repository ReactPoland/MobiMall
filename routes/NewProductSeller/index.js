import React, { Component } from 'react';
import st from '../../assets/style';
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

				<ScrollView>
				
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
				</ScrollView>

			</View>
		)
	}
}