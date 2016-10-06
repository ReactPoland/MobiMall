import React, { Component } from 'react';
import st from '../../assets/style';
import {
	Text,
	View,
	StyleSheet,
	Image,
	TextInput,
	TouchableNativeFeedback,
	ScrollView
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

class CheckboxList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currPosition: 0
		};

		this.selectCheck = this.selectCheck.bind(this);
	}

	selectCheck(item) {
		this.setState({
			currPosition: item
		});
		if (this.props.onChange) this.props.onChange(item);
	}

	render() {

		let items = this.props.children.map((component, i) => {
			let pointerStyle = st.checkboxPointer;

			if ( i === this.state.currPosition ) pointerStyle = st.checkboxPointerChecked;

			return (
				<TouchableNativeFeedback
					key={ i }
					onPress={() => {
						let curIndex = i;
						this.selectCheck( curIndex );
					}} >
						<View style={ st.chboxCardWrap }>
							{ component }

							<View >
								<View style={pointerStyle} ></View>
							</View>
						</View>

				</TouchableNativeFeedback>
			);
		});


		return (
			<View style={st.chboxCardVertContainer}>
				{ items }
			</View>
		);
	}
}

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
			buyerAddresses: []
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
		api
			.updatePersonalInfo(this.state.fbId, profileData)
			.catch(e => console.log(e));
		this.setState({ profileData });
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
  	const { firstName, lastName, email, email2, phone, about } = this.state.profileData;
		const { buyerAddresses, addressToEdit, loading, newAddress } = this.state;
		return (
			<View style={st.container}>
				<ScrollView>
					<ProfileHeader name={`${firstName} ${lastName}`} />
					<Tabs>
						<View name={'PERSONAL'} >
							<View style={st.contentWrap} >
								<Text style={st.blockSubtitle} >ADD NEW PRODUCT</Text>

								<Sae
							    label={'First name'}
							    iconClass={FontAwesomeIcon}
							    iconName={'pencil'}
							    iconColor={'gray'}
								inputStyle={st.textInputGrey}
							    // TextInput props
							    autoCapitalize={'none'}
							    onEndEditing={this.onPersonalInfoChange.bind( this, 'firstName' )}
							    autoCorrect={false}
							    value={firstName}
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
							    onEndEditing={this.onPersonalInfoChange.bind( this, 'lastName' )}
							    value={lastName}
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
							    onEndEditing={this.onPersonalInfoChange.bind( this, 'email' )}
							    value={email}
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
							    label={'Email Address'}
							    iconClass={FontAwesomeIcon}
							    iconName={'pencil'}
							    iconColor={'gray'}
								inputStyle={st.textInputGrey}
							    // TextInput props
							    autoCapitalize={'none'}
        						onEndEditing={this.onPersonalInfoChange.bind(this, 'email2')}
							    value={email2}
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
							  />

							</View>
						</View>
						<CardsManager name='PAYMENTS' fbId={this.state.fbId} />
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
							<View style={st.contentWrap} >
								<Text>test block 4</Text>
							</View>
						</View>
					</Tabs>


					{/*<View style={st.contentWrap}>
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

					<View style={st.contentWrap}>
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
