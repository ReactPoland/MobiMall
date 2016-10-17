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
import DashboardBuyer from './DashboardBuyer';
import Setting from './Setting';
import ThemeUi from '../components/ThemeUi';
import DashboardSeller from './DashboardSeller';
import ProfileChanging from './ProfileChanging';

import { COLOR, ThemeProvider } from 'react-native-material-ui';


class Switcher extends Component {

	constructor(props) {
		super(props);
		this.routesName = {
			NewProductSeller: (props) =>  (<ThemeUi route={props.route} navigator={props.navigator} ><NewProductSeller {...props} /></ThemeUi>),
			PageList: (props) => (<ThemeUi route={props.route} navigator={props.navigator} ><PageList {...props} /></ThemeUi>),
			PostProductToIG: (props) => (<ThemeUi route={props.route} navigator={props.navigator} ><PostProductToIG {...props} /></ThemeUi>),
			ShopperProfileView: (props) => (<ThemeUi route={props.route} navigator={props.navigator} ><ShopperProfileView {...props} /></ThemeUi>),
			Login: (props) => (<Login {...props} />),
			Dashboard: (props) => (<ThemeUi route={props.route} navigator={props.navigator} ><Dashboard {...props} /></ThemeUi>),
			LoginInst: (props) => (<ThemeUi route={props.route} navigator={props.navigator} ><LoginInst {...props} /></ThemeUi>),
			SellerProfileView: (props) => (<ThemeUi route={props.route} navigator={props.navigator} ><SellerProfileView {...props} /></ThemeUi>),
			DashboardBuyer: (props) => (<ThemeUi route={props.route} navigator={props.navigator} ><DashboardBuyer {...props} /></ThemeUi>),
			DashboardSeller: (props) => (<ThemeUi route={props.route} navigator={props.navigator} ><DashboardSeller {...props} /></ThemeUi>),
			ProfileChanging: (props) => (<ProfileChanging {...props} />),
			SignUp: (props) => (<SignUp {...props} />),
			Setting: (props) => (<ThemeUi route={props.route} navigator={props.navigator} ><Setting {...props} /></ThemeUi>),
		};
	}

	render() {
		let { name } = this.props.route;


		if ( name === 'Login' && this.props.manager.getDataFB() ) {
			this.props.route.name = name = 'ProfileChanging';

		}

		// if ( name === 'LoginInst' && this.props.manager.getDataInst() ) {
			// name = 'Dashboard';
		// }

		let route = this.routesName[ name ] ? this.routesName[ name ](this.props) : (
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

						toDashboardBuyer () {
							if ( !that.manager.getDataFB() ) return;

							navigator.push({
								name: 'DashboardBuyer',
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

						toProfileChanging () {
							if ( !that.manager.getDataFB() ) return;

							navigator.push({
								name: 'ProfileChanging',
								index: route.index + 1
							});	
						}

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
