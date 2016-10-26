import React, { Component } from 'react';
import {
	Text,
	View,
	ScrollView,
	StyleSheet,
	Image,
	TouchableNativeFeedback,
	Alert
} from 'react-native';
import { api, bindMethods } from '../../utils';
import { Card, Button } from 'react-native-material-design';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class Checkout extends Component {

	constructor(prop) {
		super(prop);
		bindMethods(this);
	}

	renderProducts(products) {
		return products.map(( item, k ) => (
			<Card style={checkout.cardProduct} key={k} >
			<Card.Body>

				<View style={ checkout.product } >

					<View style={checkout.prodPictCol} >
						<Image source={{uri: `https://unsplash.it/200/200?image=5` }} style={checkout.prodImg}/>
					</View>

					<View style={checkout.prodDescCol} >
						<View>
							<Text style={checkout.prodTitle} >Black T-shift</Text>
							<Text style={checkout.prodDesc} >New Season T-shift</Text>

							<View style={checkout.quantityCol}>

								<View style={checkout.quantTextCol} >
									<Text style={checkout.quantText} >2</Text> 
								</View>

								<TouchableNativeFeedback onPress={() => { Alert.alert('+ triggered ') }} >
									<View style={checkout.quantAction} >
										<Text style={checkout.quantText} >+</Text>
									</View> 
								</TouchableNativeFeedback>

								<TouchableNativeFeedback onPress={() => { Alert.alert('- triggered ') }} >
									<View style={checkout.quantAction} >
										<Text style={checkout.quantText} >-</Text>
									</View> 
								</TouchableNativeFeedback>

							</View>

							<Text style={checkout.prodPrice} >$89.99</Text>
						</View>
					</View>

					<View style={checkout.prodActCol} >
						
						<TouchableNativeFeedback onPress={() => { Alert.alert('remove') }} >
							<View>
								<FontAwesomeIcon 
									name="pencil"
									style={ { textAlign: 'center', fontSize: 25, padding: 5, color: '#efdfef', } } 
								/>
							</View>
						</TouchableNativeFeedback>
						
						<View style={{height: 30}}></View>
						

						<TouchableNativeFeedback onPress={() => { Alert.alert('unknown action') }} >
							<View>
								<FontAwesomeIcon 
									name="pencil"
									style={ { textAlign: 'center', fontSize: 25, padding: 5, color: '#efdfef', } } 
								/>
							</View>
						</TouchableNativeFeedback>

					</View>

				</View>

			</Card.Body>
			</Card>
		));

	}


	render() {

		return (
			<View style={ checkout.container } >

				<ScrollView style={{marginBottom: 60}} contentContainerStyle={{backgroundColor: '#eee'}}>

				{/*item*/}

					{ this.renderProducts([ 1, 1, 1 ]) }
				
				{/*end item*/}

					<View style={checkout.greyLine} >

						<View style={ { width: 30 } }>					
							<FontAwesomeIcon 
								name="pencil"
								style={ { textAlign: 'center', fontSize: 22, padding: 5, color: '#555', } } 
							/>
						</View>					
						
						<View style={ { flex: 1 } } >
							<Text style={checkout.greyLineDesc} >Delivery charges</Text>
						</View> 
						
						<View style={ { flex: 1 } } >
							<Text style={checkout.greyLinePrice} >$7.95</Text>
						</View> 

					</View>

					<View style={checkout.greyLine}>

					<View style={ { width: 30 } }>					
						<FontAwesomeIcon 
							name="pencil"
							style={ { textAlign: 'center', fontSize: 22, padding: 5, color: '#800080', } } 
						/>
					</View>					
					
					<View style={ { flex: 1 } } >
						<Text style={checkout.greyLineDescPurple} >Total</Text>
					</View> 
					
					<View style={ { flex: 1 } } >
						<Text style={checkout.greyLinePricePurple} >$107.85</Text>
					</View>

					</View>

					<View style={checkout.greyLine} >

						<View style={ { width: 30 } }>					
							<FontAwesomeIcon 
								name="pencil"
								style={ { textAlign: 'center', fontSize: 22, padding: 5, color: '#555', } } 
							/>
						</View>					
						
						<View style={ { flex: 1 } } >
							<Text style={checkout.greyLineDesc} >Your Savings</Text>
						</View> 
						
						<View style={ { flex: 1 } } >
							<Text style={checkout.greyLinePrice} >$58.00</Text>
						</View> 

					</View>



				</ScrollView>

				<View style={checkout.acceptRow}>

					<Button 
						text='CHECKOUT' 
						raised={true}
						overrides={ {
							backgroundColor: '#0ac600',
							textColor: '#ffffff'
						} }
						onPress={ () => Alert.alert("checkout view") }
						 />
				</View>

			</View>
		)
	}
}

const checkout = StyleSheet.create({

	acceptRow: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: '#777',
		paddingHorizontal: 30,
		paddingVertical: 5,
	},
	greyLineDescPurple: {
		fontSize: 22,
		textAlign: 'left',
		fontWeight: 'bold',
		color: '#800080',
	},
	greyLinePricePurple: {
		fontSize: 22,
		textAlign: 'right',
		fontWeight: 'bold',
		color: '#800080',
	},
	greyLineDesc: {
		fontSize: 13,
		textAlign: 'left',
		fontWeight: 'bold',
		color: '#555',
	},
	greyLinePrice: {
		fontSize: 13,
		textAlign: 'right',
		fontWeight: 'bold',
		color: '#555',
	},
	cardProduct: {
		paddingTop: -16,
		paddingBottom: -16, 
		paddingLeft: 0,
		paddingRight: 0, 
		margin: 7,
	},

	greyLine: {
		paddingHorizontal: 7,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ddd',
		height: 60,
		borderColor: '#aaa', 
		borderBottomWidth: 1,
		flexDirection: 'row',

	},

	quantTextCol: {
		paddingRight: 7,
	},

	prodPrice: {
		color: '#777',
		fontSize: 13,
		fontWeight: 'bold',
	},

	quantityCol: {
		flexDirection: 'row',
		paddingVertical: 7,
	},

	quantAction: {
		paddingHorizontal: 10,
	},

	quantText: {
		fontSize: 21,
		color: 'black',
	},

	prodTitle: {
		fontSize: 17,
		color: '#777',
	},

	prodDesc: {
		color: '#777',
		fontSize: 10,
	},

	prodImg: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		resizeMode: 'contain',
	},

	prodPictCol: {
		marginVertical: 20,
		marginHorizontal: 10,
		flex: 1,
	},

	prodDescCol: {
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'column',
	},

	prodActCol: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'purple',
		flexDirection: 'column',
		width: 70,
		height: 140,
	},
	
	container: {
		flex: 1,
		backgroundColor: '#777',
		// backgroundColor: '#eee',
	},

	product: {
		backgroundColor: 'white',
		// margin: 7,
		flexDirection: 'row',
	}

});
