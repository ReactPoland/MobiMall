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
import { bindMethods } from '../../utils';
import st from '../../assets/style';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import BuyerProfileHeader from '../../components/BuyerProfileHeader'

export default class DashboardSeller extends Component {

	constructor(prop) {
		super(prop);
		bindMethods(this);

		this.state = {
			fields: {},
			activeTab: 0,
		}
	}

	renderTabHeaders(activeNum) {

		var tabs = [ 'IC1', 'IC2' ];

		return (
			<View style={dashSellerStyle.tabList}>
				{tabs.map((item, i) => {
					let styleObj = {
						textAlign: 'center', 
						fontSize: 23,
						padding: 5,
					};
					if ( i === activeNum ) {
						styleObj.color = "purple";
					}

					return (
						<TouchableNativeFeedback onPress={ () => { let currKey = i; this.setState({activeTab: currKey}) } } key={i} >
							
							<View style={dashSellerStyle.tabItem} >
								<FontAwesomeIcon
									name="pencil"
									style={ styleObj }>
									
								</FontAwesomeIcon>
							</View>

						</TouchableNativeFeedback>
					);
				})}
			</View>
		);
	}

	render() {

		const { fields } = this.state;


		return (
			<View style={dashSellerStyle.container} >
				<ScrollView>
				
					<BuyerProfileHeader />

					{ this.renderTabHeaders(this.state.activeTab) }

					<View style={dashSellerStyle.tabContent} >

						<View style={dashSellerStyle.contentRow} >
							
							<View>
								<Text style={dashSellerStyle.blockName}>DEAL OF THE DAY</Text>
							</View>

							<View style={dashSellerStyle.dealDay} >
							   	<Image source={{uri: `https://unsplash.it/600/200?image=232` }} style={dashSellerStyle.dealDayImg}/>

							   	<View style={dashSellerStyle.dealDayContent} >
							   		<Text style={ { color: 'white', fontSize: 18 } } >AN ICON REMASTERED</Text>
							   		<Text style={ { color: 'white',  fontSize: 12 } } >THE BEATS BY DR DRE STUDIO 2 OVER-EAR HEADPHONES</Text>

									<TouchableNativeFeedback onPress={ () => { Alert.alert('buy now') } }>

								   		<View style={ dashSellerStyle.dealDayButtonRow } >
									   		<View style={ dashSellerStyle.dealDayButton } >
									   			<Text style={ { color: 'white', fontSize: 10 } } >BUY NOW 20% OFF</Text>
									   		</View>
								   		</View>
									
									</TouchableNativeFeedback>

							   	</View>
							</View>

						</View>


						<View style={dashSellerStyle.contentRow}>
							
							<View>
								<Text style={dashSellerStyle.blockName}>BEST SELLERS</Text>
							</View>

							<View style={dashSellerStyle.productList}>

								<ScrollView horizontal={true}>

									
									<View style={dashSellerStyle.productItem} >
									   		<Image source={{uri: `https://unsplash.it/150/150?image=25` }} style={dashSellerStyle.productImg}/>
										<View style={dashSellerStyle.productDesc} >
											<View>
												<Text style= { dashSellerStyle.productName } >Backpack Black</Text>
											</View>
											<Text style= { dashSellerStyle.productPrice } >$299.00</Text>
										</View>
									</View>

									<View style={dashSellerStyle.productItem} >
									   		<Image source={{uri: `https://unsplash.it/150/150?image=26` }} style={dashSellerStyle.productImg}/>
										<View style={dashSellerStyle.productDesc} >
											<View>
												<Text style= { dashSellerStyle.productName } >Backpack Black</Text>
											</View>
											<Text style= { dashSellerStyle.productPrice } >$199.00</Text>
										</View>
									</View>

									<View style={dashSellerStyle.productItem} >
									   		<Image source={{uri: `https://unsplash.it/150/150?image=27` }} style={dashSellerStyle.productImg}/>
										<View style={dashSellerStyle.productDesc} >
											<View>
												<Text style= { dashSellerStyle.productName } >Backpack Black</Text>
											</View>
											<Text style= { dashSellerStyle.productPrice } >$399.00</Text>
										</View>
									</View>

									<View style={dashSellerStyle.productItem} >
									   		<Image source={{uri: `https://unsplash.it/150/150?image=28` }} style={dashSellerStyle.productImg}/>
										<View style={dashSellerStyle.productDesc} >
											<View>
												<Text style= { dashSellerStyle.productName } >Backpack Black</Text>
											</View>
											<Text style= { dashSellerStyle.productPrice } >$299.00</Text>
										</View>
									</View>

									<View style={dashSellerStyle.productItem} >
									   		<Image source={{uri: `https://unsplash.it/150/150?image=29` }} style={dashSellerStyle.productImg}/>
										<View style={dashSellerStyle.productDesc} >
											<View>
												<Text style= { dashSellerStyle.productName } >Backpack Black</Text>
											</View>
											<Text style= { dashSellerStyle.productPrice } >$299.00</Text>
										</View>
									</View>

								
								</ScrollView>

							</View>
						</View>

						<View style={dashSellerStyle.contentRow}>
							<View>
								<Text style={dashSellerStyle.blockName}>FEATURED STORE</Text>
							</View>

							<View style={dashSellerStyle.featuredRow} >
								<View style={dashSellerStyle.featuredBlock}>
									<Text style={dashSellerStyle.featuredDesc}>
										Your Style Guide to Winter Clothes Shopping with the founder of @mm_ShopBop
									</Text>
								</View>
			
								<View style={dashSellerStyle.featuredImgBlock}>
									<Image source={{uri: `https://unsplash.it/250/250?image=39` }} style={dashSellerStyle.featuredImg}/>
								</View>

							</View>
						</View>


						<View style={dashSellerStyle.contentRow}>
							<View>
								<Text style={dashSellerStyle.blockName}>WE THOUGHT YOU MIGHT LIKE</Text>
							</View>

							<View style={dashSellerStyle.likeProductList } >

								<View style={dashSellerStyle.likeProductItem}>
									<Image source={{uri: `https://unsplash.it/100/100?image=40` }} style={dashSellerStyle.likeProductImg}/>
									<View style={dashSellerStyle.likeProductDescBlock}>
										<Text style={dashSellerStyle.likeProdName}>Boost Band Black Portable Charger Wristband Phone...</Text>

										<View  style={dashSellerStyle.likeProdPriceRow} >
											<View style={dashSellerStyle.likeProdDollIconView} >
												<Text style={dashSellerStyle.likeProdDollarIcon}>$</Text>
											</View>
				
											<Text>29.99</Text>
										</View>
									</View>
								</View>

								<View style={dashSellerStyle.likeProductItem}>
									<Image source={{uri: `https://unsplash.it/100/100?image=41` }} style={dashSellerStyle.likeProductImg}/>
									<View style={dashSellerStyle.likeProductDescBlock}>
										<Text style={dashSellerStyle.likeProdName}>Stella 7-speed Internally-geared Luxury Step-through Bicycle...</Text>

										<View  style={dashSellerStyle.likeProdPriceRow} >
											<View style={dashSellerStyle.likeProdDollIconView} >
												<Text style={dashSellerStyle.likeProdDollarIcon}>$</Text>
											</View>
								
											<Text>1,049.00</Text>
										</View>
									</View>
								</View>

								<View style={dashSellerStyle.likeProductItem}>
									<Image source={{uri: `https://unsplash.it/100/100?image=42` }} style={dashSellerStyle.likeProductImg}/>
									<View style={dashSellerStyle.likeProductDescBlock}>
										<Text style={dashSellerStyle.likeProdName}>Nomader BPA Free Collapsible Sports Water Bottle - Foldable...</Text>

										<View  style={dashSellerStyle.likeProdPriceRow} >
											<View style={dashSellerStyle.likeProdDollIconView} >
												<Text style={dashSellerStyle.likeProdDollarIcon}>$</Text>
											</View>
								
											<Text>16.95</Text>
										</View>
									</View>
								</View>

							</View>

						</View>

					</View>
					
				</ScrollView>
			</View>
		)
	}
}

const dashSellerStyle = StyleSheet.create({
	topbarText: {
		textAlign: 'center',
		fontWeight: '100',
		fontSize: 24,
		color: 'purple',
	},
	buttBack: {
		justifyContent: 'center',
		flex: 1,
	},
	title: {
		justifyContent: 'center',
		flex: 3,
	},
	shopTitleProfileBlock: {
		flexDirection: 'row',
		flex: 1,
		zIndex: 20,
		marginTop: 10,
		marginBottom: 10,
	},
	tabList: {
		borderBottomWidth: 0.5,
		borderTopWidth: 0.5,
		borderColor: '#aaa',
		flexDirection: 'row',
	},
	tabItem: {
		flex: 2,
	},
	tabItemCenter: {
		flex: 3,
	},

	likeProdDollIconView: {
		position: 'absolute',
		top: -2,
		left: 0,
	},
	topbar: {
		flexDirection: 'row',
		height: 50,
		borderBottomWidth: 1,
		justifyContent: 'center',
	},
	likeProdPriceRow: {
		paddingLeft: 7,
	},
	likeProdDollarIcon: {
		fontSize: 11,
	},
	likeProdName: {
		fontWeight: '500',
		color: 'black',
		fontSize: 16,
	},
	likeProductDescBlock: {
		flex: 1,
		paddingLeft: 10,
	},
	likeProductImg: {
		height: 80,
		width: 80,
		resizeMode: 'cover',
	},
	likeProductList: {
		paddingHorizontal: 8,
		borderWidth: 0.5,
		borderColor: '#aaa',
	},
	likeProductItem: {
		paddingTop: 8,
		flex: 1,
		flexDirection: 'row',
	},
	featuredBlock: {
		flex: 1,
		height: 180,
		borderWidth: 0.5,
		borderColor: '#aaa',
		alignItems: 'center',
		justifyContent: 'center',
	},
	featuredImgBlock: {
		height: 180,
		width: 180,
		borderWidth: 0.5,
		borderColor: '#aaa',
		alignItems: 'center',
		justifyContent: 'center',
	},
	featuredImg: {
		height: 180,
		width: 180,
		resizeMode: 'cover',
	},
	featuredDesc: {
		textAlign: 'center',
		padding: 13,
		fontSize: 19,
		fontStyle: 'italic',

	},
	featuredRow: {
		flexDirection: 'row',
	},
	productPrice: {
		paddingTop: 5,
		color: '#783ab1',
		textAlign:'center',
		fontWeight: 'bold',
	},
	productName: {
		color: 'black',
		textAlign:'center',
		fontWeight: 'bold',
	},
	productImg: {
		height: 130,
		width: 130,
    	resizeMode: 'cover',
	},
	productItem: {
		padding: 13,
		borderWidth: 0.5,
		borderColor: '#aaa',
	},
	productDesc: {
		paddingTop: 5,
		alignItems: 'center',
	},
	contentRow: {
		marginTop: 10,
	},
	shopTitleView: {
		justifyContent: 'center',
		paddingHorizontal: 10,
	},
	productList: {
		flexDirection: 'row',
	},
	dealDayButtonRow: {
		flexDirection: 'row',
		paddingTop: 10,
	},
	dealDayButton: {
		backgroundColor: 'rgba(255, 255, 255, 0.15)',
		paddingHorizontal: 15,
		paddingVertical: 8,
		borderWidth: 1,
		borderColor: 'white',
	},
	dealDayContent: {
		zIndex: 20,
		flex: 1,
		paddingHorizontal: 8,
		justifyContent: 'center',
		paddingBottom: 30,
	},
	blockName: {
		fontStyle: 'italic',
		paddingLeft: 8,
	},
	dealDay: {
		height: 180,
	},
	shopperName: {
		textAlign: 'center',
		color: 'black',
	},
	dealDayImg: {
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
		flex: 1,
		backgroundColor: `white`,
	},
	shopperImgProfile: {
		flex: 3,
		alignItems: 'center',
	},
	shopperPropsProfile: {
		flex: 2,
		alignItems: 'center',
	},
	textPropDesc: {
		textAlign: 'center',
		color: 'black',
	},
	textPropValue: {
		color: 'black',
		fontSize: 20,
	},
	alignCenter: {
		alignItems: 'center',
	}
});
