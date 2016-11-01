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
import { bindMethods, api } from '../../utils';
import routes from '../routes'
var SendIntentAndroid = require('../../components/react-native-send-intent');


export default class NewProductSeller extends Component {

	constructor(prop) {
		super(prop);
		bindMethods(this);
		// this.onLayout = this.onLayout.bind(this);
		this.state = {
			mainImageSize: {
				width: 360,
				height: 360
			},
			fogVisibility: false
		}
	}

	onLayout(event) {

		let { width, height } = event.nativeEvent.layout;
		// let newWidth = width,
			// newHeight = width;
		
		// if ( width > height ) { // vertical
			// newWidth = height;
			// newHeight = height;
		// }

		this.setState({
			mainImageSize: {
				width: width,
				height: width,
			}
		});
		this.refs['scrolView'].scrollTo({x: 0,y :0, animated: false});
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

	postToIG() {
		let product = this.props.manager.getPostProductData();
        SendIntentAndroid.openChooserWithOptions({imageUrl: product.img.uri, package: 'com.instagram.android' }, 'Share to');
		
		return;

		this.showFog();
		api
			.bodyAddNewProduct(this.props.manager.getDataFB().id, product)
			.then(response => response.json() )
			.then( data => {
			
				this.hideFog();
			
				if (data.status && data.status === 'ok' ){
					Alert.alert("Done!"); 
					this.props.navigator.popToRoute( routes.dashboardSeller );
					// navigator.push( routes.dashboardSeller );
					return;
				}

				Alert.alert(data.mess);
			})
			.catch( (err) => {Alert.alert(err.message); this.hideFog(); } );
	}



	render() {

		let product = this.props.manager.getPostProductData();
		const { navigator, Fog } = this.props;


		return (
			<View style={postStyle.container} onLayout={this.onLayout}>

					<Fog visible={ this.state.fogVisibility } />
					<ScrollView ref='scrolView' >

						<Image source={product.img} style={{
							width: this.state.mainImageSize.width,
							height: this.state.mainImageSize.height,
							resizeMode: 'cover',
						}}/>
							
						<View style={postStyle.postPageDescView} >
							<Text style={postStyle.blockTitle} >{ product.productName }</Text>

							<Text style={postStyle.textInput} >
								{ product.productId }{'\n'}
								Category:{ product.category }{'\n'}
								{ product.description }{'\n'}{'\n'}
								Quantity:{ product.quantity }{'\n'}
								Retail Price:{ product.reatilPrice }{'\n'}
								Cost Price:{ product.costPrice }{'\n'}
								Vat:{ product.vat }{'\n'}
								Supplier:{ product.supplier }{'\n'}


							</Text>

							<TouchableNativeFeedback
								onPress={() => { this.postToIG() }} > 
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
		flex: 1,
		overflow: 'hidden',
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