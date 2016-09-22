import React, { Component } from 'react';
import { Navigator, Text, ScrollView, StyleSheet, View } from 'react-native';

import NewProductSeller from './NewProductSeller';
import PageList from './PageList';
import PostProductToIG from './PostProductToIG';
import ShopperProfileView from './ShopperProfileView';
import Login from './Login';
import Dashboard from './Dashboard';







class Switcher extends Component {

	constructor(props) {
		super(props);
		this.routesName = {
			NewProductSeller: () =>  (<NewProductSeller {...this.props} />),
			PageList: () => (<PageList {...this.props} />),
			PostProductToIG: () => (<PostProductToIG {...this.props} />),
			ShopperProfileView: () => (<ShopperProfileView {...this.props} />),
			Login: () => (<Login {...this.props} />),
			Dashboard: () => (<Dashboard {...this.props} />),
		};
	}

	render() {
		let { name } = this.props.route;

		if ( name === 'Login' && this.props.manager.getDataFB()) {
			name = 'Dashboard';
		}

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
		}
		let that = this;

		this.manager = (function() {
			// var userDataFB = null;
			return {
				authFB: function( data ) {

					if ( data === true ) {

						that.setState({
							userDataFB : {
								name: 'User',
								last: 'LastName'
							}
						})
					}
				},

				getDataFB: function() {
					return that.state.userDataFB;
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
							if ( !that.manager.getDataFB() ) return;

							navigator.push({
								name: 'Dashboard',
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