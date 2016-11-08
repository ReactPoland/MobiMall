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
	NativeModules
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
			fields: {},
			activeTab: 0,
			productList: null
		}

		this.iconsMap = {
			store		:59677,
			dashboard 	:59675
		};

    	this.Icon = createIconSet(this.iconsMap, 'icomoon2' );
	}

	renderTabBody( bodyArr ) {
		return ( 
			bodyArr[ this.state.activeTab ] 
		);
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

	render() {

		const { fields } = this.state;
		const { Icon } = this;
		const { store, id } = this.props.manager.getDataFB();
		const productList = this.props.manager.getSellerProductList();
		const followers = store ? store.follower_count : null;

		if ( !store ) {
			return (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 15 }} >
					<Text style={{ textAlign: 'center', fontSize: 20 }} >Please attach your store on personal page</Text>
				</View>
			);
		}

		return (
			<View style={dashSellerStyle.container} >
				<ScrollView>

					<SellerProfileHeader name={store.igHandle} pictSource={{ uri: store.storeImgUri }} followers={followers}  />

					<TabIcons active={this.state.activeTab }>
						<View 
							onLayout={ this.updateProductList } 
							style={dashSellerStyle.contentRow} 
							icon={ <Icon 
								name="store" 
								style={ { textAlign: 'center', fontSize: 23, padding: 5, flex: 1 } }/> } 

							iconActive={ <Icon 
								name="store" 
								style={ { textAlign: 'center', fontSize: 23, padding: 5, color: 'purple', flex: 1 } } /> } >
							
							{ this.renderProductGrid(productList) }

						</View>

						<View style={dashSellerStyle.contentRow} icon={ <Icon 
								name="dashboard" 
								style={ { textAlign: 'center', fontSize: 23, padding: 5, flex: 1 } }/> } 

							iconActive={ <Icon 
								name="dashboard" 
								style={ { textAlign: 'center', fontSize: 23, padding: 5, color: 'purple', flex: 1 } } /> } >
							<View style={dashSellerStyle.prodListRow}>
								<View style={dashSellerStyle.prodBlock}>
									<View style={dashSellerStyle.prodItem}>
									   	<Image source={{uri: `http://pipsum.com/435x310.jpg?6` }} style={dashSellerStyle.productImg}/>
									</View>
								</View>
								<View style={dashSellerStyle.prodBlock}>
									<View style={dashSellerStyle.prodItem}>
									   	<Image source={{uri: `http://pipsum.com/435x310.jpg?7` }} style={dashSellerStyle.productImg}/>
									</View>
								</View>
								<View style={dashSellerStyle.prodBlock}>
									<View style={dashSellerStyle.prodItem}>
									   	<Image source={{uri: `http://pipsum.com/435x310.jpg?8` }} style={dashSellerStyle.productImg}/>
									</View>
								</View>
							</View>

							<View style={dashSellerStyle.prodListRow}>
								<View style={dashSellerStyle.prodBlock}>
									<View style={dashSellerStyle.prodItem}>
									   	<Image source={{uri: `http://pipsum.com/435x310.jpg?9` }} style={dashSellerStyle.productImg}/>
									</View>
								</View>
								<View style={dashSellerStyle.prodBlock}>
									<View style={dashSellerStyle.prodItem}>
									   	<Image source={{uri: `http://pipsum.com/435x310.jpg?10` }} style={dashSellerStyle.productImg}/>
									</View>
								</View>
								<View style={dashSellerStyle.prodBlock}>
									<View style={dashSellerStyle.prodItem}>
									   	<Image source={{uri: `http://pipsum.com/435x310.jpg?11` }} style={dashSellerStyle.productImg}/>
									</View>
								</View>
							</View>
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
		marginTop: 10,
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
