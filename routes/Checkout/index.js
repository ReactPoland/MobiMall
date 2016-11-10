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
import routes from '../routes';
import { Card } from 'react-native-material-design';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Swipeout from '../../components/react-native-swipeout';
import { Button } from 'react-native-material-ui';

export default class Checkout extends Component {

	constructor(prop) {
		super(prop);
		bindMethods(this);
		this.state = {
			transaction: null,
			checkoutButtonReady: true,
		}
	}

	componentDidMount() {
		api.transactionProductList(this.props.manager.getDataFB().id)
		.then( ({data}) => {
			if (data.status == 'ok') {
				
				if (!data.value) {
					Alert.alert('Opened transactions don\'t exist');
					this.props.navigator.pop();
					return;
				}

				this.setState({
					transaction: data.value
				});

			}
			else {
				Alert.alert(data.mess);
				this.props.navigator.pop();
			}

		} )
		.catch( e => {
			console.log(e.message);
			Alert.alert('Server error');
			this.props.navigator.pop();
		});
	}

	countProduct( id, operation = '+' ) {
		let { transaction } = this.state;
		let currProductIndex = transaction.products.findIndex( product => product.productId == id );

		if ( currProductIndex >= 0 ) {

			if (operation == "+") {
				if (transaction.products[currProductIndex].orderedQuantity < transaction.products[currProductIndex].maxQuantity )
					transaction.products[currProductIndex].orderedQuantity++;
			}
			else {
				if (transaction.products[currProductIndex].orderedQuantity > 1)
					transaction.products[currProductIndex].orderedQuantity--;
			};

			this.setState({ transaction: transaction });
		}

	}


	removeProduct( id ) {
		let { transaction } = this.state;
		let currProductIndex = transaction.products.findIndex( product => product.productId == id );

		if ( currProductIndex >= 0 ) {

			transaction.products.splice( currProductIndex, 1 );
			this.setState({ transaction: transaction });
		}
	}

	renderProducts(products) {
		return products.map(( item, k ) => {

			let actionView = (
				<View style={checkout.prodActCol} >
					
					<TouchableNativeFeedback onPress={ this.removeProduct.bind(this, item.productId) } >
						<View>
							<FontAwesomeIcon 
								name="pencil"
								style={ { textAlign: 'center', fontSize: 25, padding: 5, color: '#efdfef', } } 
							/>
						</View>
					</TouchableNativeFeedback>
					
{/*					<View style={{height: 30}}></View>
					

					<TouchableNativeFeedback onPress={() => { Alert.alert('unknown action') }} >
						<View>
							<FontAwesomeIcon 
								name="pencil"
								style={ { textAlign: 'center', fontSize: 25, padding: 5, color: '#efdfef', } } 
							/>
						</View>
					</TouchableNativeFeedback>*/}

				</View>
			);

			return (
				<Card style={checkout.cardProduct} key={k} >
				<Card.Body>
				<Swipeout
					right={[ { component: actionView } ]}
					rowID={1}
					sectionID={1}
					autoClose={true}
					close={true}
					// onOpen={(sectionID, rowID) => this._handleSwipeout(sectionID, rowID) }
					// scroll={event => this._allowScroll(event)}
				>

					<View style={ checkout.product } >

						<View style={checkout.prodPictCol} >
							<Image source={{uri: item.imgUrl  }} style={checkout.prodImg}/>
						</View>

						<View style={checkout.prodDescCol} >
							<View>
								<Text style={checkout.prodTitle} >{ item.name }</Text>
								<Text style={checkout.prodDesc} >{ item.description }</Text>

								<View style={checkout.quantityCol}>

									<View style={checkout.quantTextCol} >
										<Text style={checkout.quantText} >{item.orderedQuantity}</Text> 
									</View>

									<TouchableNativeFeedback onPress={ this.countProduct.bind(this, item.productId, '+' ) } >
										<View style={checkout.quantAction} >
											<Text style={checkout.quantText} >+</Text>
										</View> 
									</TouchableNativeFeedback>

									<TouchableNativeFeedback onPress={ this.countProduct.bind(this, item.productId, '-' ) } >
										<View style={checkout.quantAction} >
											<Text style={checkout.quantText} >-</Text>
										</View> 
									</TouchableNativeFeedback>

								</View>

								<Text style={checkout.prodPrice} >${item.costPrice}</Text>
							</View>
						</View>



					</View>

				</Swipeout>
				</Card.Body>
				</Card>
			)
		});

	}

	renderGreyStrips(products) {

		let totalPrice = 0;

		products.map( product => {
			totalPrice += product.costPrice * product.orderedQuantity;
		});

		return (
			<View>
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
						<Text style={checkout.greyLinePricePurple} >${ totalPrice }</Text>
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
			</View>
		)

	}

	renderEmptyContainer( isSetTimeout = false ) {

		if (isSetTimeout) {
			setTimeout(() => this.props.navigator.pop(), 1000 );
		};

		return (
			<View style={ checkout.container } >

			</View>
		);
	}

	acceptList() {
		this.setState({checkoutButtonReady: false});
		api.acceptProductList( this.props.manager.getDataFB().id, this.state.transaction ).then( ( { data } ) => {

			if (data.status == 'ok') {

				this.props.manager.requestHandler(this.props.manager.getDataFB().id);

				this.setState({checkoutButtonReady: true});
				let alertText = `Paid: $ ${data.value.price}${'\n'}from card: ...${data.value.source.last4}`;
				// `Was made charge from your card: $${totalPrice}`
				Alert.alert(alertText);
				// dashboardRoute = routes.profileChanging;
				// this.props.navigator.getCurrentRoutes(item => {

				// 	if ( item.key == routes.dashboardSeller.key ) {
				// 		dashboardRoute = routes.dashboardSeller;
				// 	}

				// 	if ( item.key == routes.dashboardBuyer.key ) {
				// 		dashboardRoute = routes.dashboardBuyer;
				// 	}

				// });

				this.props.navigator.pop();

			} else {
				this.setState({checkoutButtonReady: true});
				Alert.alert(data.mess);
			}

		})
		.catch( e => {
			this.setState({checkoutButtonReady: true});
			Alert.alert(e.message);
		})
	}


	render() {

		if (this.state.transaction) {

			if (!this.state.transaction.products.length) {

				return (this.renderEmptyContainer(true) )

			}


			return (
				<View style={ checkout.container } >

					<ScrollView style={{marginBottom: 60}} contentContainerStyle={{backgroundColor: '#eee'}}>

					{/*item*/}

						{ this.renderProducts( this.state.transaction.products ) }
						{ this.renderGreyStrips( this.state.transaction.products ) }
					
					{/*end item*/}


					</ScrollView>

					<View style={checkout.acceptRow}>

					{ this.state.checkoutButtonReady ? (
						<Button 
							text='CHECKOUT' 
							raised={true}
							style={ {
								container: {
									backgroundColor: '#0ac600',
								},
								text: {
									color: '#ffffff'
								}
							}}
							onPress={ this.acceptList }
							 />
						) : null
					}

					</View>

				</View>
			);
		}

		return ( this.renderEmptyContainer() );
	}
}

const checkout = StyleSheet.create({

	acceptRow: {
		position: 'absolute',
		bottom: 10,
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
		flex: 1,
		resizeMode: 'contain',
	},

	prodPictCol: {
		marginVertical: 20,
		marginHorizontal: 10,
		flex: 1,
	},

	prodDescCol: {
		padding: 20,
		alignItems: 'flex-start',
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
		flex: 1,
		// height: 140,
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
