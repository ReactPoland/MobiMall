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
	NativeModules,
	WebView,
} from 'react-native';
import { bindMethods, api } from '../../utils';
import st from '../../assets/style';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SellerProfileHeader from '../../components/SellerProfileHeader'
import { createIconSet } from 'react-native-vector-icons';
import TabIcons from '../../components/TabIcons'


class Switcher extends Component {


	render() {
		let { active } = this.props;

		return ( this.props.children[active] );
	}
}

export default class DashboardSeller extends Component {

	constructor(prop) {
		super(prop);
		bindMethods(this);

		this.state = {
			webViewHeight: 0,
			fields: {},
			productList: null,
			showFog: 0,
		}

		this.iconsMap = {
			dashboard 	:59648
		};

		this.iconsMap2 = {
			store		:59677,
		};

    	this.Icon = createIconSet(this.iconsMap, 'icomoon' );
    	this.Icon2 = createIconSet(this.iconsMap2, 'icomoon2' );
	}

	componentDidMount() {
		// if (this.props.manager.getSellerProductList() == null ) {
			// this.api.getSellerDashboard( this.props.manager.getDataFB().id ).then( ({data}) => {

				// if (data.status == 'ok') {
					// this.props.manager.setSellerProductList(data.value);
					// this.forceUpdate();
				// } else {
					// Alert.alert(data.mess);
				// }
			// } )
		// }
	}

	renderProductGrid(productList) {
		let gridView = (
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Text style={{textAlign: 'center', fontSize: 20}}>
					Loading
				</Text>
			</View>
		);

		if (productList) {

			if (!productList.length) 
				gridView = (
					<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						<Text style={{textAlign: 'center', fontSize: 20}}>
							Products not found
						</Text>
					</View>
				);

			let productsView = productList.map( ( imageUrl, i ) => (
				<View style={dashSellerStyle.prodBlock} key={i}>
					<View style={dashSellerStyle.prodItem}>
					   	<Image source={{uri: imageUrl }} style={dashSellerStyle.productImg}/>
					</View>
				</View>
			) );

			let wrappedProducts = [];

			let rowQuantity = 3;
			for (let i = 0; i < productsView.length; i+= rowQuantity ) {

				wrappedProducts.push(
					<View style={dashSellerStyle.prodListRow} key={ i - rowQuantity }>
						{productsView.slice( i, i + rowQuantity )}
					</View>
				);
			};

			gridView = wrappedProducts;

		} 

		return gridView;		
	}

	updateProductList() {
		// if (this.props.manager.getSellerProductList() == null ) {
			api.getSellerDashboard( this.props.manager.getDataFB().id ).then( ({data}) => {

				if (data.status == 'ok') {
					this.props.manager.setSellerProductList(data.value);
					this.forceUpdate();
				} else {
					Alert.alert(data.mess);
				}
			} )
		// }
	}

	updateWebViewTab(ev) {
		let containerHeight,
			webViewOffset;

		if ( !this.state.webViewHeight ) {

			this.refs.containerDashboardSeller.measure((fx, fy, width, height, px, py) => {
				containerHeight = height;
				this.refs.dashboardWebviewWrap.measure( (fx, fy, width, height, px, py) => {
					webViewOffset = py;
					this.setState({
						webViewHeight: Math.floor(containerHeight - webViewOffset ) + 50
					});
				} );
			});

		}

	}


	hideFog() {
		this.setState({showFog: this.state.showFog - 1 });
	}

	showFog() {
		this.setState({showFog: this.state.showFog + 1 });
	}


	render() {

		const { fields } = this.state;
		const { Icon2, Icon } = this;
		const { store, id } = this.props.manager.getDataFB();
		const productList = this.props.manager.getSellerProductList();
		const followers = store ? store.follower_count : null;
		let { Fog } = this.props;

		if ( !store ) {
			return (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 15 }} >
					<Text style={{ textAlign: 'center', fontSize: 20 }} >Please attach your store on personal page</Text>
				</View>
			);
		}

		return (
			<View style={dashSellerStyle.container} ref={'containerDashboardSeller'} >
			
				<Fog visible={this.state.showFog > 0 } />

			
				<ScrollView>

					<SellerProfileHeader name={store.igHandle} pictSource={{ uri: store.storeImgUri }} followers={followers}  />

					<TabIcons >
						<View 
							onLayout={ this.updateProductList } 
							style={dashSellerStyle.contentRow} 
							icon={ 
								<Icon2 
									name="store" 
									style={ { textAlign: 'center', fontSize: 23, padding: 5, flex: 1 } }/> 
							} iconActive={ 
								<Icon2
									name="store" 
									style={ { textAlign: 'center', fontSize: 23, padding: 5, color: 'purple', flex: 1 } } /> 
							} >
							
							{ this.renderProductGrid(productList) }

						</View>

						<View 
							style={dashSellerStyle.contentRow} 
							icon={ 
								<Icon
									name="dashboard" 
									style={ { textAlign: 'center', fontSize: 23, padding: 5, flex: 1 } } /> 
							}
							onLayout={ this.updateWebViewTab }
							ref={'dashboardWebviewWrap'}
							iconActive={ 
								<Icon 
									name="dashboard" 
									style={ { textAlign: 'center', fontSize: 23, padding: 5, color: 'purple', flex: 1 } } /> 
							} >

								<WebView
									startInLoadingState= {true}
									domStorageEnabled={true}
									style={{height: this.state.webViewHeight}}
									source={{
										uri: `https://adminmobimall.herokuapp.com/dashboardv2`
									}} />
						</View>

					</TabIcons>
					
				</ScrollView>
			</View>
		)
	}
}

const dashSellerStyle = StyleSheet.create({
	tabList: {
		borderBottomWidth: 0.5,
		borderTopWidth: 0.5,
		borderColor: '#aaa',
		flexDirection: 'row',
	},
	productImg: {
		flex: 1,
		position: 'absolute',
		zIndex: 10,
		resizeMode: 'cover',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	prodListRow: {
		flexDirection: 'row',
		flex: 1,
	},
	prodBlock: {
		paddingVertical: 5,
		paddingHorizontal: 5,
	},
	prodItem: {
		backgroundColor: 'black',
		height: 110,
		width: 110,
	},
	tabItem: {
		flex: 2,
	},
	contentRow: {
		borderTopWidth: 0.5,
		borderColor: '#aaa',
		// marginTop: 10,
	},
	container: {
		flex: 1,
		backgroundColor: `white`,
	},
	shopTitleView: {
		justifyContent: 'center',
		paddingHorizontal: 10,
	},
	shopTitleProfileBlock: {
		flexDirection: 'row',
		flex: 1,
		zIndex: 20,
		marginTop: 10,
		marginBottom: 10,
	},
	shopperImgProfile: {
		flex: 3,
		alignItems: 'center',
	},
	shopperName: {
		textAlign: 'center',
		color: 'black',
	},
	shopProfileImg: {

	},
	shopperPropsProfile: {
		flex: 2,
		alignItems: 'center',
	},
	alignCenter: {
		alignItems: 'center',
	},
	textPropValue: {
		color: 'black',
		fontSize: 20,
	},
	textPropDesc: {
		textAlign: 'center',
		color: 'black',
	},

});
