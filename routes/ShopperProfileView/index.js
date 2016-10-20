import React, { Component } from 'react';
import st from '../../assets/style';
import {
	Text,
	View,
	StyleSheet,
	Image,
	ScrollView,
	TextInput
} from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";
import Tabs from '../../components/Tabs';
import CardRow from '../../components/CardRow';
import ProfileHeader from '../../components/ProfileHeader';
import CardsManager from '../../components/CardsManager';
import AddressInput from '../../components/AddressInput';
import AddressBox from '../../components/AddressBox';
import { bindMethods } from '../../utils';
import { api } from '../../utils';
import Stripe from '../../stripe';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import { Card } from 'react-native-material-design';
import PurpleButton from '../../components/PurpleButton';
import BuyerProfileHeader from '../../components/BuyerProfileHeader';


export default class ShopperProfileView extends Component {
	constructor(props) {
		super(props);
		bindMethods(this);
		this.state = {
			fbId: this.props.manager.getDataFB().id,
			profileData: {},
			addressToEdit: null,
      addressToEditIndex: false,
      newAddress: {},
			buyerAddresses: [],
			saving: false
		};
	}

	componentDidMount () {
		this.setState({ loading: true });
		api
			.getPersonalInfo(this.state.fbId)
			.then(({ data }) => this.setState({ profileData: data }))
			.catch(e => console.log('err'));
		api
			.getBuyerAddresses(this.state.fbId)
			.then(({ data }) => this.setState({ buyerAddresses: data, loading: false }))
			.catch(e => console.log('e:', e));
	}

	onPersonalInfoChange (property, event) {
		const profileData = Object.assign({}, this.state.profileData);
		profileData[property] = event.nativeEvent.text;
		this.setState({ profileData });
	}

	onPersonalInfoSave () {
		const { profileData } = this.state;
		this.setState({ saving: true });
		api
			.updatePersonalInfo(this.state.fbId, profileData)
			.then(() => this.setState({ saving: false }))
			.catch(e => console.log(e));
	}

	_setAddressToEdit (index) {
    this.setState({
      addressToEdit: this.state.buyerAddresses[index],
      addressToEditIndex: index
    });
  }

	_onChange (prop, val) {
    if(this.state.addressToEdit) {
      const { addressToEdit } = this.state;
      addressToEdit[prop] = val;
      this.setState({ addressToEdit });
    } else {
      const { newAddress } = this.state;
      newAddress[prop] = val;
      this.setState({ newAddress });
    }
  }

	_onSave () {
    if(this.state.addressToEdit) {
      const { addressToEdit, addressToEditIndex, buyerAddresses, fbId } = this.state;
      buyerAddresses[addressToEditIndex] = addressToEdit;
      api
        .saveBuyerAddresses(fbId, buyerAddresses)
        .then(() => this.setState({ addressToEdit: null }));
    } else {
      const { newAddress, buyerAddresses, fbId } = this.state;
      buyerAddresses.push(newAddress);
      api
        .saveBuyerAddresses(fbId, buyerAddresses)
        .then(() => this.setState({ newAddress: {}, buyerAddresses }));
    }
  }

	_onDelete (index) {
    const { buyerAddresses, fbId } = this.state;
    buyerAddresses.splice(index, 1);
    api
      .saveBuyerAddresses(fbId, buyerAddresses)
      .then(() => this.setState({ buyerAddresses }));
  }

	render() {
  	const { phone, about } = this.state.profileData;
		const { buyerAddresses, addressToEdit, loading, newAddress, saving } = this.state;
		const fbData = this.props.manager.getDataFB();
		const { name, id, firstName, lastName, email } = fbData;
		return (
			<View style={st.container}>
				<ScrollView>
				  	
				  	<BuyerProfileHeader />
					
					<Tabs>
						<View name={'PERSONAL'} >
							<Card>
								<Card.Body>
									<Text style={st.blockSubtitle} >PERSONAL DETAILS</Text>

									<Sae
								    label={'First name'}
								    iconClass={FontAwesomeIcon}
								    iconName={'pencil'}
								    iconColor={'gray'}
										inputStyle={st.textInputGrey}
								    // TextInput props
								    autoCapitalize={'none'}
								    autoCorrect={false}
								    value={firstName}
										editable={false}
								  />

									<Sae
								    label={'Last name'}
								    iconClass={FontAwesomeIcon}
								    iconName={'pencil'}
								    iconColor={'gray'}
										inputStyle={st.textInputGrey}

								    // TextInput props
								    autoCapitalize={'none'}
								    autoCorrect={false}
								    value={lastName}
										editable={false}
								  />

									<Sae
								    label={'Email Address'}
								    iconClass={FontAwesomeIcon}
								    iconName={'pencil'}
								    iconColor={'gray'}
										inputStyle={st.textInputGrey}
								    // TextInput props
								    autoCapitalize={'none'}
								    autoCorrect={false}
								    value={email}
										editable={false}
								  />

									<Sae
								    label={'Phone number'}
								    iconClass={FontAwesomeIcon}
								    iconName={'pencil'}
								    iconColor={'gray'}
										inputStyle={st.textInputGrey}
								    // TextInput props
								    autoCapitalize={'none'}
	        					onEndEditing={this.onPersonalInfoChange.bind(this, 'phone')}
								    value={phone}
								    autoCorrect={false}
								  />

								  <Sae
								    label={'About'}
								    iconClass={FontAwesomeIcon}
								    iconName={'pencil'}
								    iconColor={'gray'}
								    inputStyle={st.textInputGrey}
								    autoCapitalize={'none'}
								    autoCorrect={false}
								    onEndEditing={this.onPersonalInfoChange.bind(this, 'about')}
								    value={about}
										multiline={true}
										numberOfLines={4}
								  />

									<PurpleButton text={saving ? 'SAVING...' : 'SAVE'} onPress={this.onPersonalInfoSave} />
								</Card.Body>
							</Card>
						</View>
						<CardsManager name='PAYMENT' fbId={this.state.fbId} />
						<View name={'SHIPPING'}>
							<AddressBox
								addresses={buyerAddresses}
								loading={loading}
								mode='ShippingTab'
								onPress={this._setAddressToEdit}
								onDelete={this._onDelete}
							/>
							<AddressInput
							 shouldDisplay={true}
							 addressToEdit={addressToEdit || newAddress}
							 onChange={this._onChange}
							 onSave={this._onSave}
							 isNew={!addressToEdit}
							/>
						</View>

						<View name={'HISTORY'}>
							<Card >
								<Card.Body>
									<Text>test block 4</Text>
								</Card.Body>
							</Card>
						</View>
					</Tabs>


					{/*<Card>
						<Text style={st.blockTitle} >ADD NEW PRODUCT</Text>


						<Text style={st.textInput} >Product name</Text>
						<TextInput
							style={st.input}
							placeholder={'Mens Brogue Shoe'}
							underlineColorAndroid="#edb4ff"
							placeholderTextColor='#cccccc'
							/>

						<Text style={st.textInput} >Category</Text>

						<TextInput
							style={st.input}
							placeholder={'Shoes'}
							placeholderTextColor='#cccccc'
							underlineColorAndroid="#edb4ff" />

						<Text style={st.textInput} >Description</Text>

						<View style={st.inputMultiWrap}>
							<TextInput
								style={st.inputMulti}
								placeholder={'Populated by my facebook profile'}
								multiline = {true}
								placeholderTextColor='#b6b6b6'
								underlineColorAndroid="transparent"
								numberOfLines = {4} />
						</View>
					</View>

					<Card>
						<View style={st.lineView}>
							<Text style={st.buttonDescription} >ADD PRODUCT IMAGE</Text>
							<TouchableNativeFeedback
								onPress={() => {
									console.log('begin');
								}} >
								<View style={st.squareBorderButton} >
									<Text style={st.buttName} >IMAGE ICON BUTTON</Text>
								</View>
							</TouchableNativeFeedback>
						</View>

					</View>*/}

				</ScrollView>

			</View>
		)
	}
}
