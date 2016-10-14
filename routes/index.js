import React, { Component } from 'react';
import { Navigator, Text, ScrollView, StyleSheet, View, UIManager } from 'react-native';

import NewProductSeller from './NewProductSeller';
import PageList from './PageList';
import PostProductToIG from './PostProductToIG';
import ShopperProfileView from './ShopperProfileView';
import Login from './Login';
import Dashboard from './Dashboard';
import SellerProfileView from './SellerProfileView';
import LoginInst from './LoginInst';
import SignUp from './SignUp';
import DashboardSeller from './DashboardSeller';
import Setting from './Setting';
import ThemeUi from '../components/ThemeUi';

import { COLOR, ThemeProvider } from 'react-native-material-ui';


class Switcher extends Component {

	constructor(props) {
		super(props);
		this.routesName = {
			NewProductSeller: () =>  (<ThemeUi><NewProductSeller {...this.props} /></ThemeUi>),
			PageList: () => (<ThemeUi><PageList {...this.props} /></ThemeUi>),
			PostProductToIG: () => (<ThemeUi><PostProductToIG {...this.props} /></ThemeUi>),
			ShopperProfileView: () => (<ThemeUi><ShopperProfileView {...this.props} /></ThemeUi>),
			Login: () => (<Login {...this.props} />),
			Dashboard: () => (<ThemeUi><Dashboard {...this.props} /></ThemeUi>),
			LoginInst: () => (<ThemeUi><LoginInst {...this.props} /></ThemeUi>),
			SellerProfileView: () => (<ThemeUi><SellerProfileView {...this.props} /></ThemeUi>),
			DashboardSeller: () => (<ThemeUi><DashboardSeller {...this.props} /></ThemeUi>),
			SignUp: () => (<SignUp {...this.props} />),
			Setting: () => (<ThemeUi><Setting {...this.props} /></ThemeUi>),
		};
	}

	render() {
		let { name } = this.props.route;


		if ( name === 'Login' && this.props.manager.getDataFB() ) {
			name = 'Dashboard';
		}

		// if ( name === 'LoginInst' && this.props.manager.getDataInst() ) {
			// name = 'Dashboard';
		// }

		let route = this.routesName[ name ] ? this.routesName[ name ]() : (
			<Text style={{color: 'red'}}>Can't found route</Text>
		);


		return (
			<View style={st.scrollContent}>
				{ route }
			</View>
		)
	}

}





export default class Router extends Component {

	static get defaultProps() {
		return {
			route: 'Login',
		}
	}

	constructor(props) {
		super(props);

		this.state = {
			userDataFB: null,
			userDataInst: null
		}
		let that = this;

		this.manager = (function() {
			// var userDataFB = null;
			return {
				authFB: function( data ) {

					if ( data ) {

						that.setState({
							userDataFB : data
						});
					}
				},

				getDataFB: function() {
					return that.state.userDataFB;
				},

				authInst: function( data ) {

					if ( data ) {

						that.setState({
							userDataInst : data
						});
					}
				},

				getDataInst: function() {
					return that.state.userDataInst;
				},

			}
		})();

		

	}



	render() {
		let that = this;
		return (
			<Navigator
				initialRoute={{ name: this.props.route, index: 0 }}
				renderScene={ ( route, navigator ) => {

					let routeMethods = {

						toDashboard: function() {
							// if ( !that.manager.getDataFB() || !that.manager.getDataInst() ) return;
							if ( !that.manager.getDataFB() ) return;

							navigator.push({
								name: 'Dashboard',
								index: route.index + 1
							});
						},

						toSignUp: function() {
							navigator.push({
								name: 'SignUp',
								index: route.index + 1
							});
						},

						toBuyerProfile: function() {
							// if ( !that.manager.getDataFB() || !that.manager.getDataInst() ) return;
							if ( !that.manager.getDataFB() ) return;

							navigator.push({
								name: 'ShopperProfileView',
								index: route.index + 1
							});
						},

						toPostProductToIG: function(data) {
							navigator.push({
								name: 'PostProductToIG',
								index: route.index + 1,
								data,
							});
						},

						toSellerProfile () {
							// if ( !that.manager.getDataFB() || !that.manager.getDataInst() ) return;
							if ( !that.manager.getDataFB() ) return;

							navigator.push({
								name: 'SellerProfileView',
								index: route.index + 1
							});
						},

						toNewProductSeller () {
							// if ( !that.manager.getDataFB() || !that.manager.getDataInst() ) return;
							if ( !that.manager.getDataFB() ) return;

							navigator.push({
								name: 'NewProductSeller',
								index: route.index + 1
							});
						},

						toLogin() {
							navigator.push({
								name: 'Login',
								index: route.index + 1
							});
						},

						toDashboardSeller () {
							if ( !that.manager.getDataFB() ) return;

							navigator.push({
								name: 'DashboardSeller',
								index: route.index + 1
							});
						},

						toBack () {
							if (route.index > 0) {
						    	navigator.pop();
							}
						},

						toSetting () {
							if ( !that.manager.getDataFB() ) return;

							navigator.push({
								name: 'Setting',
								index: route.index + 1
							});
						},

					};

					return (
				    <Switcher
				    	manager= { this.manager }
				    	route={ route }
				    	navigator={ routeMethods }

					    // Function to call when a new scene should be displayed
					    // onForward={ () => {
					    	// const nextIndex = route.index + 1;
					        // navigator.push({
					        	// title: 'Scene ' + nextIndex,
					        	// index: nextIndex,
					        // });
					    // }}

					    // Function to call to go back to the previous scene
					    // onBack={() => {
					        // if (route.index > 0) {
					    	    // navigator.pop();
					        // }
					    // }}
				    />
				  	)
				} }
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
