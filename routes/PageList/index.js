import React, { Component } from 'react';
import {
	Navigator,
	Text,
	View,
	TouchableHighlight,
	StyleSheet
} from 'react-native';

export default class PageList extends Component {
	render() {

		return (
			<View style={styles.container}>
				<TouchableHighlight onPress={ () => {

					this.props.navigator.push({
						name: 'NewProductSeller',
						index: this.props.route.index + 1
					});
				} } >
					<Text style={styles.welcome}>New Product Seller</Text>
				</TouchableHighlight>

				<TouchableHighlight onPress={ () => {

					this.props.navigator.push({
						name: 'PostProductToIG',
						index: this.props.route.index + 1
					});
				} } >
					<Text style={styles.welcome}>Post Product to IG</Text>
				</TouchableHighlight>

				<TouchableHighlight onPress={ () => {

					this.props.navigator.push({
						name: 'ShopperProfileView',
						index: this.props.route.index + 1
					});
				} } >
					<Text style={styles.welcome}>Shopper Profile View</Text>
				</TouchableHighlight>

				<TouchableHighlight onPress={ () => {

					this.props.navigator.push({
						name: 'Login',
						index: this.props.route.index + 1
					});
				} } >
					<Text style={styles.welcome}>Login View</Text>
				</TouchableHighlight>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});
