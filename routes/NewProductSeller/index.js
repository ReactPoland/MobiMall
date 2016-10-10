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
	ScrollView,
	Platform
} from 'react-native';
import { bindMethods, api } from '../../utils';
import { Card } from 'react-native-material-design';
var ImagePicker = require('react-native-image-picker');


export default class NewProductSeller extends Component {

	constructor(props) {
		super(props);
		bindMethods(this);

		this.state = {
			productData: {}
		};

	}

	onSendProduct() {

		let formdata = new FormData();
		formdata.append("product[name]", 'test')
		formdata.append("product[price]", 10)
		formdata.append("product[category_ids][]", 2)
		formdata.append("product[description]", '12dsadadsa')
		formdata.append("product[images_attributes[0][file]]", {uri: this.state.productData.img, type: 'multipart/form-data'})

		fetch('http://192.168.1.244:3000/api/users/checkNewProduct',{
			method: 'post',
			headers: {
		    	'Content-Type': 'multipart/form-data',
			},
			body: formdata
		})
		.then(response => {
			console.log(response);
			console.log("image uploaded")
		})
		.catch(err => {
			console.log(err)
		});


		// var data = new FormData();
		// data.append('foo', 'bar');
        // data.append('file', this.state.productData.img);


		// api.checkNewProduct( this.props.manager.getDataFB().id, data ).then( ({ data }) => {

		// 	if ( data.status === 'ok' ) {
		// 		this.props.navigator.toPostProductToIG( data.productInfo );
		// 	}
		// 	else {
		// 		Alert.alert( data.mess );
		// 	}

		// })
		// .catch((err) => {
		// 	Alert.alert(err.message);
		// })
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
		const { 
			productName, 
			category, 
			description, 
			quantity,
			reatilPrice,
			costPrice,
			vat,
			supplier } = this.state.productData;


		
			
		return (
			<View style={st.container}>

				<ScrollView>

					<View style={ st.titleView } >
						<Image source={{uri: 'https://unsplash.it/600/100?image=147'}} style={st.imgTitle}/>
						<Text style={ st.titleText } >SHOP NAME</Text>
					</View>
						
					<Card>
						<Card.Body>
							<Text style={st.blockTitle} >ADD NEW PRODUCT</Text>
							

							<Text style={st.textInput} >Product name</Text>
							<TextInput 
								style={st.input}
								onChange={ this.changeProductData.bind(this, 'productName') }
								placeholder={'Mens Brogue Shoe'} 
								underlineColorAndroid="#edb4ff" 
								placeholderTextColor='#cccccc'
								value={ productName }
								/>

							<Text style={st.textInput} >Category</Text>
							
							<TextInput 
								style={st.input} 
								onChange={ this.changeProductData.bind(this, 'category') }
								placeholder={'Shoes'} 
								placeholderTextColor='#cccccc'
								value={ category }
								underlineColorAndroid="#edb4ff" 
								/>

							<Text style={st.textInput} >Description</Text>
							
							<View style={st.inputMultiWrap}>
								<TextInput 
									style={st.inputMulti} 
									onChange={ this.changeProductData.bind(this, 'description') }
									placeholder={'Populated by my facebook profile'} 
									multiline = {true} 
									placeholderTextColor='#b6b6b6'
									underlineColorAndroid="transparent"
									value={ description }
									numberOfLines = {4} />
							</View>
						</Card.Body>
					</Card>

					<Card>
						<Card.Body>
							<View style={st.lineView}>
								<Text style={st.buttonDescription} >ADD PRODUCT IMAGE</Text>
								<TouchableNativeFeedback
									onPress={() => {

										const options = {
											title: 'Select Avatar',
											customButtons: [
										    	{
										    		name: 'fb', 
										    		title: 'Choose Photo from Facebook'
										    	},
										  	],
										  	storageOptions: {
										    	skipBackup: true,
										    	path: 'images'
										  	}
										};

										ImagePicker.showImagePicker(options, (response) => {
											console.log('Response = ', response);

										  if (response.didCancel) {
										    console.log('User cancelled image picker');
										  }
										  else if (response.error) {
										    console.log('ImagePicker Error: ', response.error);
										  }
										  else if (response.customButton) {
										    console.log('User tapped custom button: ', response.customButton);
										  }
										  else {
										    // You can display the image using either data...
										    const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true, name:response.fileName };

										    // or a reference to the platform specific asset location
										    if (Platform.OS === 'ios') {
										      const source = {uri: response.uri.replace('file://', ''), isStatic: true, name:response.fileName };
										    } else {
										      const source = {uri: response.uri, isStatic: true, name:response.fileName  };
										    }

										    let newProductData = Object.assign({}, this.state.productData);
										    newProductData.img = response.uri;

										    this.setState({
										    	productData: newProductData,
										      	imgName: response.fileName
										    });
										  }
										});

									}} >
									<View style={st.squareBorderButton} >
										<Text style={st.buttName} >{ (this.state.imgName ) ? this.state.imgName : `UPLOAD IMAGE` }</Text>
									</View>
								</TouchableNativeFeedback>
							</View>
						</Card.Body>

					</Card>

					<Card>
						<Card.Body>

							<Text style={st.textInput} >Quantity in Stock</Text>
							
							<TextInput 
								style={st.input}
								onChange={ this.changeProductData.bind(this, 'quantity') }
								placeholder={'456'} 
								underlineColorAndroid="#edb4ff" 
								placeholderTextColor='#cccccc'
								value={ quantity } />

							<Text style={st.textInput} >Retail Price $</Text>
							
							<TextInput 
								style={st.input}
								onChange={ this.changeProductData.bind(this, 'reatilPrice') }
								placeholder={'89'} 
								underlineColorAndroid="#edb4ff" 
								placeholderTextColor='#cccccc'
								value={ reatilPrice } />

							<Text style={st.textInput} >Cost Price $</Text>
							
							<TextInput 
								style={st.input}
								onChange={ this.changeProductData.bind(this, 'costPrice') }
								placeholder={'56'} 
								underlineColorAndroid="#edb4ff" 
								placeholderTextColor='#cccccc'
								value={ costPrice } />

							<Text style={st.textInput} >VAT %</Text>
							
							<TextInput 
								style={st.input}
								onChange={ this.changeProductData.bind(this, 'vat') }
								placeholder={'4.5'} 
								underlineColorAndroid="#edb4ff" 
								placeholderTextColor='#cccccc'
								value={ vat } />

							<Text style={st.textInput} >Supplier</Text>
							
							<TextInput 
								style={st.input}
								onChange={ this.changeProductData.bind(this, 'supplier') }
								placeholder={'Bescot Shoes'} 
								underlineColorAndroid="#edb4ff" 
								placeholderTextColor='#cccccc'
								value={ supplier } />
						
							<TouchableNativeFeedback
							  onPress={this.onSendProduct} >
								<View style={st.purpleButtonView} >
							    	<Text style={st.purpleButtonName} >SAVE PRODUCT</Text>
								</View>
							</TouchableNativeFeedback>

						</Card.Body>
					</Card>

				</ScrollView>

			</View>
		)
	}
}
