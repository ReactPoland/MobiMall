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
	TouchableWithoutFeedback,
	ScrollView,
	Platform
} from 'react-native';
import { bindMethods, api } from '../../utils';
import { Card } from 'react-native-material-design';
var ImagePicker = require('react-native-image-picker');
import routes from '../routes'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default class NewProductSeller extends Component {

	constructor(props) {
		super(props);
		bindMethods(this);

		this.state = {
			productData: {},
			fogVisibility: false,
			productImg: null,
		};

	}

	onSendProduct() {

		if (!this.state.productImg) {
			Alert.alert('Please choose file');
			return;
		};

		// let product = { ...productData, productImg };

		// api
		// 	.bodyAddNewProduct(this.props.manager.getDataFB().id, product )
		// 	.then(resp => resp.text())
		// 	.then(resp => console.log(resp));

		// return;



		// let formdata = new FormData();
		// formdata.append("product[name]", 'test');
		// formdata.append("product[price]", 10);
		// formdata.append("product[category_ids][]", 2);
		// formdata.append("product[description]", '12dsadadsa');
		// formdata.append("product[file][path]", this.state.productImg );

		// console.log(formdata);


		// fetch("http://192.168.1.244:3000/upload", {
		// 	method: 'POST',
		// 	body: formdata
		// })
		// .then(response => response.text() )
		// .then(response => {
		// 	console.log(response);
		// })
		// .catch(err => {
		// 	Alert.alert('error');
		// 	console.log(err.message);
		// });

		// return;


		// var data = new FormData();
		// data.append('foo', 'bar');
        // data.append('file', this.state.productData.img);

		this.showFog();
        // let this = that;


		api.checkNewProduct( this.props.manager.getDataFB().id, this.state.productData ).then( ({ data }) => {
        	

			if ( data.status === 'ok' ) {
				this.hideFog();
				data.productInfo.img = this.state.productImg;
				this.props.manager.setPostProductData( data.productInfo );
				this.props.navigator.push( routes.postProductToIG );
			}
			else {
				Alert.alert( data.mess );
				this.hideFog();
			}
		})
		.catch((err) => {
			this.hideFog();
			Alert.alert(err.message);
		})
	}

	showFog() {
		this.setState({
			fogVisibility: true
		})
	}

	hideFog() {
		this.setState({
			fogVisibility: false
		})
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
		const { Fog } = this.props;

		/*if ( this.state.fogVisibility ) return (
			<Fog />
		);*/

		return (
			<View style={st.container}>

				<Fog visible={ this.state.fogVisibility } />
			
				<ScrollView >

					<View style={ st.titleView } >
						<Image source={{uri: 'http://pipsum.com/600x400.jpg'}} style={st.imgTitle}/>
						<Text style={ st.titleText } >SHOP NAME</Text>
					</View>
						
					<Card>
						<Card.Body>
							<Text style={st.blockTitle} >ADD NEW PRODUCT</Text>
							

							<Text style={st.textInput} >Product name</Text>

							<TextInput 
								ref={'testInput'}
								style={st.input}

								onChange={ this.changeProductData.bind(this, 'productName') }
								placeholder={'Mens Brogue Shoe'} 
								underlineColorAndroid="#ccc" 
								placeholderTextColor='#cccccc'
								value={ productName }
								/>

							<Text style={st.textInput} >Category</Text>
							
							<TextInput
								onFocus={ () => {console.log('onFocus')} } 
								style={{zIndex: 10}} 
								onChange={ this.changeProductData.bind(this, 'category') }
								placeholder={'Shoes'} 
								placeholderTextColor='#cccccc'
								value={ category }
								underlineColorAndroid="#ccc" 
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

										  	if ( response.fileSize > 3145728 ) { // 1024 * 1024 * 3
										  		Alert.alert('File is too big');
										  		return;
										  	}
										    // You can display the image using either data...
										    // const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true, name:response.fileName };
										    let source;

										    // or a reference to the platform specific asset location
										    if (Platform.OS === 'ios') {
										      source = {uri: response.uri.replace('file://', ''), isStatic: true, name:response.fileName };
										    } else {
										      source = {uri: response.uri, isStatic: true, name:response.fileName  };
										    }

										    // let newProductData = Object.assign({}, this.state.productData);
										    let img = {
											    uri: source.uri,
											    type: 'image/jpeg',
											    name: 'photo.jpg',
											}

										    this.setState({
										    	productImg: img,
										    });
										  }
										});

									}} >
									<View style={st.squareBorderButton} >
										{ this.state.productImg ? (
											<Image source={this.state.productImg} style={st.buttonPickerImg} />
										) : (
											<Text style={st.buttName} >UPLOAD IMAGE</Text>
										) }
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
								keyboardType={'numeric'}
								placeholder={'456'} 
								underlineColorAndroid="#ccc" 
								placeholderTextColor='#cccccc'
								value={ quantity } />

							<Text style={st.textInput} >Retail Price $</Text>
							
							<TextInput 
								style={st.input}
								onChange={ this.changeProductData.bind(this, 'reatilPrice') }
								keyboardType={'numeric'}
								placeholder={'89'} 
								underlineColorAndroid="#ccc" 
								placeholderTextColor='#cccccc'
								value={ reatilPrice } />

							<Text style={st.textInput} >Cost Price $</Text>
							
							<TextInput 
								style={st.input}
								onChange={ this.changeProductData.bind(this, 'costPrice') }
								keyboardType={'numeric'}
								placeholder={'56'} 
								underlineColorAndroid="#ccc" 
								placeholderTextColor='#cccccc'
								value={ costPrice } />

							<Text style={st.textInput} >VAT %</Text>
							
							<TextInput 
								style={st.input}
								onChange={ this.changeProductData.bind(this, 'vat') }
								keyboardType={'numeric'}
								placeholder={'4.5'} 
								underlineColorAndroid="#ccc" 
								placeholderTextColor='#cccccc'
								value={ vat } />

							<Text style={st.textInput} >Supplier</Text>
							
							<TextInput 
								style={st.input}
								onChange={ this.changeProductData.bind(this, 'supplier') }
								placeholder={'Bescot Shoes'} 
								underlineColorAndroid="#ccc" 
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
