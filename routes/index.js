import React, { Component } from 'react';
import { Navigator, Text, ScrollView, StyleSheet, View } from 'react-native';

import NewProductSeller from './NewProductSeller';
import PageList from './PageList';
import PostProductToIG from './PostProductToIG';









class Switcher extends Component {

	constructor(props) {
		super(props);
		this.routesName = {
			NewProductSeller: () =>  (<NewProductSeller {...this.props} />),
			PageList: () => (<PageList {...this.props} />),
			PostProductToIG: () => (<PostProductToIG {...this.props} />)
		};
	}

	render() {
		let { name } = this.props.route;

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
			route: 'PageList',
		}
	}


	render() {
		return (
			<Navigator 
				initialRoute={{ name: this.props.route, index: 0 }}
				renderScene={ ( route, navigator ) => {
					return (
					    <Switcher 
					    	route={ route }
					    	navigator={ navigator }

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