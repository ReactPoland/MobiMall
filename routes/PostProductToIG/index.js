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
	Clipboard
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
			fogVisibility: false,
			redirectWarningVisibility: false
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

	isInstalledIG() {
		return new Promise((resolve, reject) => {
			SendIntentAndroid.isExistPackage('com.instagram.android', (res) => resolve(res) );
		});
	}

	async postToIG() {
		let product = this.props.manager.getPostProductData();
		let isIGExists = await this.isInstalledIG();

		if (!isIGExists) {
			Alert.alert('Please install IG app and log in');
			return;
		}
		// check out is exist IG app on your phone

		this.showFog();
		api
			.bodyAddNewProduct(this.props.manager.getDataFB().id, product)
			.then(response => response.json() )
			.then( data => {
			
				this.hideFog();
			
				if (data.status && data.status === 'ok' ) {
					this.showWarning();
					// Alert.alert("Done!"); 
					// this.props.navigator.popToRoute( routes.dashboardSeller );
					return;
				}

				Alert.alert("Response err", data.mess);
				this.props.navigator.pop();

			})
			.catch( (err) => {Alert.alert('Server err', err.message); this.hideFog(); this.props.navigator.pop(); } );
	}

	showWarning() {
		this.setState({redirectWarningVisibility: true});
	}

	hideWarning() {
		this.setState({redirectWarningVisibility: false});
	}

	makeRedirect() {
		let product = this.props.manager.getPostProductData();
        this.hideWarning();

        let dashboardRoute = routes.profileChanging;

        this.props.manager.setSellerProductList(null);

		this.props.navigator.popN( 2 );
		Clipboard.setString( this.buildDesc( product, product.productName + "\n\n" ) );
        SendIntentAndroid.openChooserWithOptions({imageUrl: product.img.uri, package: 'com.instagram.android' }, 'Share to');
	}

	renderFogWarningBody(store) {

		let warnStoreName = store && store.companyName ? `as "${store.companyName}"` : 'to proper shop';

		return ( 
			<View style={postStyle.warningBg}>
				<Text style={postStyle.warnPopText} >Warning{'\n'}</Text>
				<Text style={postStyle.warnPopDesc} >You need to be logged in { warnStoreName } on Instagram app</Text>
				<Text style={postStyle.warnPopNotify} >*Your product description was writed in clipboard</Text>

				<TouchableNativeFeedback onPress={this.makeRedirect}>
					<View style={postStyle.warnButtView} >
						<Text style={postStyle.warnButtText} >Continue</Text>
					</View>
				</TouchableNativeFeedback>

			</View> 
		);
	}

	buildDesc(product, descBefore = '') {

//  !!!! DON'T ADD TAB !!!!

		return descBefore + `${ product.productId }
Category:${ product.category }
${ product.description }


Quantity:${ product.quantity }
Retail Price:${ product.reatilPrice }
Cost Price:${ product.costPrice }
Vat:${ product.vat }
Supplier:${ product.supplier }`;
	}



	render() {

		let product = this.props.manager.getPostProductData();
		let { store } = this.props.manager.getDataFB();
		const { navigator, Fog } = this.props;

		return (
			<View style={postStyle.container} onLayout={this.onLayout}>

				<Fog visible={ this.state.redirectWarningVisibility } >
					{ this.renderFogWarningBody(store) }
				</Fog>

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
							{ this.buildDesc(product) }
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
	warningBg: {
		padding: 20,
		backgroundColor: 'rgba(0,0,0, 0.5)',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	warnPopDesc: {
		color: 'white',
		textAlign: 'center',
		fontSize: 17,
		fontStyle: 'italic',
	},
	warnPopNotify: {
		color: 'white',
		textAlign: 'left',
		fontStyle: 'italic',
		fontSize: 12,
	},
	warnButtView: {
		position: 'absolute',
		bottom: 50,
		left: 20,
		right: 20,
		borderRadius: 7,
		paddingVertical: 15,
		backgroundColor: '#eee',
	},
	warnButtText: {
		fontSize: 35,
		color: 'black',
		textAlign: 'center',
	},
	warnPopText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 20,
	},
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