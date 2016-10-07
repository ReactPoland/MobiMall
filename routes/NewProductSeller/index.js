import React, { Component } from 'react';
import st from '../../assets/style';
import { 
	Text, 
	View, 
	StyleSheet, 
	Image,
	TextInput,
	Alert,
	TouchableNativeFeedback,
	ScrollView
} from 'react-native';
import { bindMethods, api } from '../../utils';

export default class NewProductSeller extends Component {

	constructor(props) {
		super(props);
		bindMethods(this);

		this.state = {
			productData: {}
		};

	}

	onSendProduct() {
		// Alert.alert( JSON.stringify( this.state.productData ) );

		api.checkNewProduct( this.props.manager.getDataFB().id, this.state.productData ).then( ({ data }) => {

			if ( data.status === 'ok' ) {
				this.props.navigator.toPostProductToIG( data.productInfo );
				// Alert.alert('SHOWING POST VIEW');
			}
			else {
				Alert.alert( data.mess );
			}

		});

		// console.log('Send into server');
	}

	changeProductData(prop, event) {
		const productData = Object.assign({}, this.state.productData);
		productData[prop] = event.nativeEvent.text;

		// api
			// .updatePersonalInfo(this.state.fbId, productData)
			// .catch(e => console.log(e));
		this.setState({ productData });
	}


	render() {
		const { productName, category, description } = this.state;
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
							onEndEditing={ this.changeProductData.bind(this, 'productName') }
							placeholder={'Mens Brogue Shoe'} 
							underlineColorAndroid="#edb4ff" 
							placeholderTextColor='#cccccc'
							value={ productName }
							/>

						<Text style={st.textInput} >Category</Text>
						
						<TextInput 
							style={st.input} 
							onEndEditing={ this.changeProductData.bind(this, 'category') }
							placeholder={'Shoes'} 
							placeholderTextColor='#cccccc'
							value={ category }
							underlineColorAndroid="#edb4ff" 
							/>

						<Text style={st.textInput} >Description</Text>
						
						<View style={st.inputMultiWrap}>
							<TextInput 
								style={st.inputMulti} 
								onEndEditing={ this.changeProductData.bind(this, 'description') }
								placeholder={'Populated by my facebook profile'} 
								multiline = {true} 
								placeholderTextColor='#b6b6b6'
								underlineColorAndroid="transparent"
								value={ description }
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

					<View style={st.contentWrap}>
						<TouchableNativeFeedback
						  onPress={this.onSendProduct} >
						  <View style={st.purpleButtonView} >
						    <Text style={st.purpleButtonName} >SAVE ADDRESS</Text>
						  </View>
						</TouchableNativeFeedback>
					</View>


				</ScrollView>

			</View>
		)
	}
}