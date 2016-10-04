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
			profileData: {}
		};
	}

	componentDidMount () {
	api
		.getPersonalInfo(this.state.fbId)
		.then(({ data }) => this.setState({ profileData: data }))
		.catch(e => console.log('err'));
	}

	onPersonalInfoChange (property, event) {
		const profileData = Object.assign({}, this.state.profileData);
		profileData[property] = event.nativeEvent.text;
		api
			.updatePersonalInfo(this.state.fbId, profileData)
			.catch(e => console.log(e));
		this.setState({ profileData });
	}

	render() {
  		const { firstName, lastName, email, email2, phone } = this.state.profileData;

  		console.log(this.state.profileData);

		return (
			<View style={st.container}>
				<ScrollView>
					<ProfileHeader />
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
							    value={email2}
							    autoCorrect={false}
							  />
							</View>
						</View>
						<CardsManager name='PAYMENTS' fbId={this.state.fbId} />
						<View name={'SHIPPING'}>
							<View style={st.contentWrap} >
								<Text style={st.blockSubtitle} >DEFAULT ADDRESS</Text>

								<TextInput
									style={st.input}
									placeholder={'Mens Brogue Shoe'}
									underlineColorAndroid="#edb4ff"
									placeholderTextColor='#cccccc'
									/>

								<TextInput
									style={st.input}
									placeholder={'Mens Brogue Shoe'}
									underlineColorAndroid="#edb4ff"
									placeholderTextColor='#cccccc'
									/>

							</View>
							<View style={st.contentWrap} >
								<Text style={st.blockSubtitle} >ADD ADDRESS</Text>

								<Text style={st.textInputGrey} >Country:</Text>
								<TextInput
									style={st.input}
									placeholder={'Mens Brogue Shoe'}
									underlineColorAndroid="#edb4ff"
									placeholderTextColor='#cccccc'
									/>

								<Text style={st.textInputGrey} >Address:</Text>
								<TextInput
									style={st.input}
									placeholder={'Mens Brogue Shoe'}
									underlineColorAndroid="#edb4ff"
									placeholderTextColor='#cccccc'
									/>

								<Text style={st.textInputGrey} >ZIP / Postal Code:</Text>
								<TextInput
									style={st.input}
									placeholder={'Mens Brogue Shoe'}
									underlineColorAndroid="#edb4ff"
									placeholderTextColor='#cccccc'
									/>

								<Text style={st.textInputGrey} >City:</Text>
								<TextInput
									style={st.input}
									placeholder={'Mens Brogue Shoe'}
									underlineColorAndroid="#edb4ff"
									placeholderTextColor='#cccccc'
									/>

								<Text style={st.textInputGrey} >Best time:</Text>
								<TextInput
									style={st.input}
									placeholder={'Mens Brogue Shoe'}
									underlineColorAndroid="#edb4ff"
									placeholderTextColor='#cccccc'
									/>

								<TouchableNativeFeedback
									onPress={() => {
										console.log('begin');
									}} >
									<View style={st.purpleButtonView} >
										<Text style={st.purpleButtonName} >SAVE ADDRESS</Text>
									</View>
								</TouchableNativeFeedback>
							</View>
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
