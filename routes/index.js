import React, { Component } from 'react';
import { Navigator, Text, ScrollView, StyleSheet, View, BackAndroid } from 'react-native';

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
// import DashboardSeller from './DashboardSeller';
// import ProfileChanging from './ProfileChanging';

import { COLOR, ThemeProvider } from 'react-native-material-ui';

import routes from './routes';



const manager = ( function () {

	let userDataFB = null;
	let userDataInst = null;
	let productData = null;

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

		getDataInst: function() {
			return userDataInst;
		},

		setPostProductData: function(prodData) {
			productData = prodData;
		},

		getPostProductData: function() {
			return productData;
		}
	})
})();


export default class Router extends Component {

	static configureScene(route) {
	    return route.animationType || Navigator.SceneConfigs.FloatFromBottom;
	}

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		BackAndroid.addEventListener('hardwareBackPress', function() {
			return true;
		});
	}

	static renderScene (route, navigator) {

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
					navigator={ navigator } >
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
