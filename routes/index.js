import React, { Component } from 'react';
import { Navigator, Text, ScrollView, StyleSheet, View, BackAndroid, Alert } from 'react-native';

// import NewProductSeller from './NewProductSeller';
// import PageList from './PageList';
// import PostProductToIG from './PostProductToIG';
// import ShopperProfileView from './ShopperProfileView';
// import Login from './Login';
// import Dashboard from './Dashboard';
// import SellerProfileView from './SellerProfileView';
// import LoginInst from './LoginInst';
// import SignUp from './SignUp';
// import DashboardBuyer from './DashboardBuyer';
// import Setting from './Setting';
import ThemeUi from '../components/ThemeUi';
import Fog from '../components/Fog';
import PushNotification from '../components/PushNotification';
// import DashboardSeller from './DashboardSeller';
// import ProfileChanging from './ProfileChanging';

import { COLOR, ThemeProvider } from 'react-native-material-ui';

import routes from './routes';
import { api, auth0lock } from '../utils';
import BackgroundTimer from 'react-native-background-timer';

const manager = ( function () {

	let userDataFB = null;
	let userDataInst = null;
	let productData = null;
	let sellerProductList = null;
	

	let isExistTrans = false;
	let transProdProps = [];

	let transListeners = [];
	let timerTransaction = null;

	return({
		authFB: function( data ) {

			if ( data ) {
				userDataFB = data;
			}
		},

		getDataFB: function() {
			return userDataFB;
		},

		authInst: function( data ) {

			userDataInst = data;
			// if ( data ) {

				// that.setState({
					// userDataInst : data
				// });
			// }
		},

		setSellerProductList: (productList) => {
			sellerProductList = productList;
		},

		getSellerProductList: () => {
			return sellerProductList;
		},


		getDataInst: function() {
			return userDataInst;
		},

		setPostProductData: function(prodData) {
			productData = prodData;
		},

		getPostProductData: function() {
			return productData;
		},
		
		setTimerTransaction: function() {
			if (!timerTransaction) {
				timerTransaction = BackgroundTimer.setInterval(() => {

					if ( manager.getDataFB() ) {
						this.requestHandler( manager.getDataFB().id )
					}
					console.log('check basket');

				}, 1000 * 10 );
			}
		},

		getTransAvail: function() {
			return isExistTrans;
		},

		isHasNewProducts: function(basketProducts) {
			let isNewProducts = false;

			basketProducts.map( basketProduct => {
				let prod = transProdProps.find(lastRequestProduct => lastRequestProduct.productCode == basketProduct.productCode );
				if (prod) {
					if (prod.quantity !== basketProduct.quantity ) 
						isNewProducts = true;
				} else {
					isNewProducts = true;
				}
				
			} ); 

			transProdProps = basketProducts;

			return isNewProducts;
		},

		requestHandler: function(fbId) {
			api.checkOpenTransaction( fbId ).then( ( { data } ) => {

				if ( data.status == 'ok' ) {
					let newValue = !!data.value;

					if ( isExistTrans != newValue ) {

						isExistTrans = newValue;
						transListeners.map( item => item( isExistTrans ) );

					};


					if ( data.value && data.value.products && this.isHasNewProducts(data.value.products) ) {
						// PushNotification().cancelLocalNotifications({id: '123'});
						PushNotification().localNotification({
							id: '123',
							autoCancel: true, // (optional) default: true
							largeIcon: "mobimall_launcher", // (optional) default: "ic_launcher"

							// bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop

							vibrate: true, // (optional) default: true
							vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
							tag: 'checkout', // (optional) add tag to message
							group: "group", // (optional) add group to message
							ongoing: false, // (optional) set whether this is an "ongoing" notification

							title: "Accept buying", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
							message: "You buyed in the IG store", // (required)
							soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)

						});
						// push notification
					} else {
						// PushNotification.cancelAllLocalNotifications();
						// PushNotification().cancelLocalNotifications({id: '123'});
					}

				}
				else {
					console.log( data.mess );
				}

			})
			.catch(e => {
				console.log('error server check transaction');
			})

		},

		removeTimerTransaction: function() {
			BackgroundTimer.clearInterval(timerTransaction);
			// clearInterval(timerTransaction);
		},

		setTransListeners: function(handler) {
			transListeners.push(handler);
		},

		removeTransListeners: function(handler) {
			let index = transListeners.findIndex( elem => elem === handler );
			if ( index >= 0 ){
				transListeners.splice(index, 1);
			}
		}

	})
})();


export default class Router extends Component {

	static configureScene(route) {
		/*
			FadeAndroid
			FloatFromBottom
			FloatFromBottomAndroid
			FloatFromLeft
			FloatFromRight
			HorizontalSwipeJump
			HorizontalSwipeJumpFromRight
			PushFromRight
			VerticalDownSwipeJump
			VerticalUpSwipeJump
		*/
	    return route.animationType || Navigator.SceneConfigs.FloatFromBottomAndroid;
	}

	constructor(props) {
		super(props);
		manager.setTimerTransaction();
	}

	componentWillUnmount() {
		manager.removeTimerTransaction();
	}

	componentDidMount() {
		BackAndroid.addEventListener('hardwareBackPress', function() {
			// Alert.alert('', 'backButton');
			return true;
		});
	}

	static renderScene (route, navigator) {

		PushNotification(navigator);

		let retComponent = (
			<View style={ {flex: 1 } } >
				<route.Page
					Fog={Fog}
					route={ route }
					navigator={ navigator }
					manager={ manager } />
			</View>
		);

		if (route.themeUi)
			retComponent = ( 
				<ThemeUi
					route = { route } 
					navigator={ navigator } 
					manager={ manager } >
					{retComponent}
				</ThemeUi> 
			);

		return ( retComponent );
	}


	render() {

		let that = this;

		return (
			<Navigator
                configureScene={ Router.configureScene }
				initialRoute={ routes.login }
				renderScene={ Router.renderScene }
			/>
		)
	}
}

const st = StyleSheet.create({
	scrollContent: {
		flex: 1,
		// backgroundColor: '#9100be',
	}
});
