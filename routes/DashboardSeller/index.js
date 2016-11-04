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

	render() {

		const { fields } = this.state;
		const { Icon } = this;


		return (
			<View style={dashSellerStyle.container} >
				<ScrollView>

					<SellerProfileHeader />

					<TabIcons active={this.state.activeTab }>
						<View style={dashSellerStyle.contentRow} icon={ <Icon 
								name="store" 
								style={ { textAlign: 'center', fontSize: 23, padding: 5, flex: 1 } }/> } 

							iconActive={ <Icon 
								name="store" 
								style={ { textAlign: 'center', fontSize: 23, padding: 5, color: 'purple', flex: 1 } } /> } >

							<View style={dashSellerStyle.prodListRow}>
								<View style={dashSellerStyle.prodBlock}>
									<View style={dashSellerStyle.prodItem}>
									   	<Image source={{uri: `http://pipsum.com/435x310.jpg` }} style={dashSellerStyle.productImg}/>
									</View>
								</View>
								<View style={dashSellerStyle.prodBlock}>
									<View style={dashSellerStyle.prodItem}>
									   	<Image source={{uri: `http://pipsum.com/435x311.jpg` }} style={dashSellerStyle.productImg}/>
									</View>
								</View>
								<View style={dashSellerStyle.prodBlock}>
									<View style={dashSellerStyle.prodItem}>
									   	<Image source={{uri: `http://pipsum.com/435x312.jpg` }} style={dashSellerStyle.productImg}/>
									</View>
								</View>
							</View>

							<View style={dashSellerStyle.prodListRow}>
								<View style={dashSellerStyle.prodBlock}>
									<View style={dashSellerStyle.prodItem}>
									   	<Image source={{uri: `http://pipsum.com/435x313.jpg` }} style={dashSellerStyle.productImg}/>
									</View>
								</View>
								<View style={dashSellerStyle.prodBlock}>
									<View style={dashSellerStyle.prodItem}>
									   	<Image source={{uri: `http://pipsum.com/435x314.jpg` }} style={dashSellerStyle.productImg}/>
									</View>
								</View>
								<View style={dashSellerStyle.prodBlock}>
									<View style={dashSellerStyle.prodItem}>
									   	<Image source={{uri: `http://pipsum.com/435x315.jpg` }} style={dashSellerStyle.productImg}/>
									</View>
								</View>
							</View>

							<View style={dashSellerStyle.prodListRow}>
								<View style={dashSellerStyle.prodBlock}>
									<View style={dashSellerStyle.prodItem}>
									   	<Image source={{uri: `http://pipsum.com/435x316.jpg` }} style={dashSellerStyle.productImg}/>
									</View>
								</View>
								<View style={dashSellerStyle.prodBlock}>
									<View style={dashSellerStyle.prodItem}>
									   	<Image source={{uri: `http://pipsum.com/435x317.jpg` }} style={dashSellerStyle.productImg}/>
									</View>
								</View>
								<View style={dashSellerStyle.prodBlock}>
									<View style={dashSellerStyle.prodItem}>
									   	<Image source={{uri: `http://pipsum.com/435x318.jpg` }} style={dashSellerStyle.productImg}/>
									</View>
								</View>
							</View>

							<View style={dashSellerStyle.prodListRow}>
								<View style={dashSellerStyle.prodBlock}>
									<View style={dashSellerStyle.prodItem}>
									   	<Image source={{uri: `http://pipsum.com/435x319.jpg` }} style={dashSellerStyle.productImg}/>
									</View>
								</View>
								<View style={dashSellerStyle.prodBlock}>
									<View style={dashSellerStyle.prodItem}>
									   	<Image source={{uri: `http://pipsum.com/435x320.jpg?1` }} style={dashSellerStyle.productImg}/>
									</View>
								</View>
								<View style={dashSellerStyle.prodBlock}>
									<View style={dashSellerStyle.prodItem}>
									   	<Image source={{uri: `http://pipsum.com/435x321.jpg?2` }} style={dashSellerStyle.productImg}/>
									</View>
								</View>
							</View>

							<View style={dashSellerStyle.prodListRow}>
								<View style={dashSellerStyle.prodBlock}>
									<View style={dashSellerStyle.prodItem}>
									   	<Image source={{uri: `http://pipsum.com/435x310.jpg?3` }} style={dashSellerStyle.productImg}/>
									</View>
								</View>
								<View style={dashSellerStyle.prodBlock}>
									<View style={dashSellerStyle.prodItem}>
									   	<Image source={{uri: `http://pipsum.com/435x310.jpg?4` }} style={dashSellerStyle.productImg}/>
									</View>
								</View>
								<View style={dashSellerStyle.prodBlock}>
									<View style={dashSellerStyle.prodItem}>
									   	<Image source={{uri: `http://pipsum.com/435x310.jpg?5` }} style={dashSellerStyle.productImg}/>
									</View>
								</View>
							</View>

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
