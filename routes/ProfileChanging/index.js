import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	ScrollView,
	Alert,
	Dimensions,
	NativeModules
} from 'react-native';
import { COLOR, ThemeProvider, Button } from 'react-native-material-ui';
import routes from '../routes'
import { api, bindMethods } from '../../utils';


export default class NewProductSeller extends Component {

	constructor(prop) {
		super(prop);
		bindMethods(this);
		this.uiTheme = {
		    palette: {
		        primaryColor: COLOR.green500,
		    },
		    toolbar: {
		        container: {
		            height: 50,
		        },
		    },
		};
	}

	saveUserType(type) {
		return api.saveUserType(this.props.manager.getDataFB().id, type);
	}

	render() {


		return (
        <ThemeProvider uiTheme={ this.uiTheme } >

			<View style={loginStyle.container} >

				<View style={ { flex: 1, padding: 30 } } >
					<Button 
						raised 
						text="SHOP" 
						style={{ 
							container: { 
								flex: 1, 
								backgroundColor: `rgba(84, 70, 184, 0.7)`,
							}, 
							text: { 
								fontSize: 40, 
								color: 'white' 
							} 
						}} 
						onPress={ () => { this.saveUserType('buyer').then( resp => { this.props.navigator.replace(routes.dashboardBuyer) }); } } />
				</View>
		
				<View style={ { flex: 1, padding: 30 } } >
					<Button 
						raised 
						text="SELL" 
						style={{ 
							container: { 
								flex: 1, 
								backgroundColor: `rgba(84, 70, 184, 0.7)`,
							}, 
							text: { 
								fontSize: 40, 
								color: 'white' 
							} 
						}} 
						onPress={ () => { this.saveUserType('seller').then( resp => { this.props.navigator.replace(routes.dashboardSeller) } ); } } />
				</View>

			</View>
        </ThemeProvider>
		)
	}
}

const loginStyle = StyleSheet.create({
	container: {
		backgroundColor: '#eee',
		flex: 1,
		overflow: 'hidden',
	},
});
