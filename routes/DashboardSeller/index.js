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

					<View style={dashSellerStyle.contentRow} >

						<View style={dashSellerStyle.prodListRow}>
							<View style={dashSellerStyle.prodBlock}>
								<View style={dashSellerStyle.prodItem}>
								   	<Image source={{uri: `https://unsplash.it/250/200?image=30` }} style={dashSellerStyle.productImg}/>
								</View>
							</View>
							<View style={dashSellerStyle.prodBlock}>
								<View style={dashSellerStyle.prodItem}>
								   	<Image source={{uri: `https://unsplash.it/200/150?image=31` }} style={dashSellerStyle.productImg}/>
								</View>
							</View>
							<View style={dashSellerStyle.prodBlock}>
								<View style={dashSellerStyle.prodItem}>
								   	<Image source={{uri: `https://unsplash.it/150/100?image=32` }} style={dashSellerStyle.productImg}/>
								</View>
							</View>
						</View>

						<View style={dashSellerStyle.prodListRow}>
							<View style={dashSellerStyle.prodBlock}>
								<View style={dashSellerStyle.prodItem}>
								   	<Image source={{uri: `https://unsplash.it/250/100?image=33` }} style={dashSellerStyle.productImg}/>
								</View>
							</View>
							<View style={dashSellerStyle.prodBlock}>
								<View style={dashSellerStyle.prodItem}>
								   	<Image source={{uri: `https://unsplash.it/250/150?image=34` }} style={dashSellerStyle.productImg}/>
								</View>
							</View>
							<View style={dashSellerStyle.prodBlock}>
								<View style={dashSellerStyle.prodItem}>
								   	<Image source={{uri: `https://unsplash.it/100/100?image=35` }} style={dashSellerStyle.productImg}/>
								</View>
							</View>
						</View>

						<View style={dashSellerStyle.prodListRow}>
							<View style={dashSellerStyle.prodBlock}>
								<View style={dashSellerStyle.prodItem}>
								   	<Image source={{uri: `https://unsplash.it/250/50?image=36` }} style={dashSellerStyle.productImg}/>
								</View>
							</View>
							<View style={dashSellerStyle.prodBlock}>
								<View style={dashSellerStyle.prodItem}>
								   	<Image source={{uri: `https://unsplash.it/200/150?image=37` }} style={dashSellerStyle.productImg}/>
								</View>
							</View>
							<View style={dashSellerStyle.prodBlock}>
								<View style={dashSellerStyle.prodItem}>
								   	<Image source={{uri: `https://unsplash.it/150/100?image=38` }} style={dashSellerStyle.productImg}/>
								</View>
							</View>
						</View>

						<View style={dashSellerStyle.prodListRow}>
							<View style={dashSellerStyle.prodBlock}>
								<View style={dashSellerStyle.prodItem}>
								   	<Image source={{uri: `https://unsplash.it/250/200?image=39` }} style={dashSellerStyle.productImg}/>
								</View>
							</View>
							<View style={dashSellerStyle.prodBlock}>
								<View style={dashSellerStyle.prodItem}>
								   	<Image source={{uri: `https://unsplash.it/200/150?image=40` }} style={dashSellerStyle.productImg}/>
								</View>
							</View>
							<View style={dashSellerStyle.prodBlock}>
								<View style={dashSellerStyle.prodItem}>
								   	<Image source={{uri: `https://unsplash.it/150/100?image=41` }} style={dashSellerStyle.productImg}/>
								</View>
							</View>
						</View>

						<View style={dashSellerStyle.prodListRow}>
							<View style={dashSellerStyle.prodBlock}>
								<View style={dashSellerStyle.prodItem}>
								   	<Image source={{uri: `https://unsplash.it/250/200?image=30` }} style={dashSellerStyle.productImg}/>
								</View>
							</View>
							<View style={dashSellerStyle.prodBlock}>
								<View style={dashSellerStyle.prodItem}>
								   	<Image source={{uri: `https://unsplash.it/200/150?image=31` }} style={dashSellerStyle.productImg}/>
								</View>
							</View>
							<View style={dashSellerStyle.prodBlock}>
								<View style={dashSellerStyle.prodItem}>
								   	<Image source={{uri: `https://unsplash.it/150/100?image=32` }} style={dashSellerStyle.productImg}/>
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
		resizeMode: 'contain',
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
		flex: 1,
		paddingVertical: 5,
		paddingHorizontal: 2,
	},
	prodItem: {
		backgroundColor: 'black',
		height: 110,
		flex: 1,
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
});
