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


class Tabs extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentPage: 0,
			tabTitleWidth: Math.floor(360 / 3)
		};

		this.onLayoutView = this.onLayoutView.bind(this);
		this.selectTab = this.selectTab.bind(this);
	}

	onLayoutView(ev) {
		let { width, height } = ev.nativeEvent.layout;

		this.setState({
			tabTitleWidth: Math.floor(width / 3)
		});
	}

	selectTab(index) {
		this.setState({
			currentPage: index
		});
	}


	render() {
		let tabs = this.props.children.map( ( component, index ) =>  {
			let textViewStyles = {
				position: 'absolute',
				top: 0,
				left: 12,
				bottom: 0,
				right: 12,
			};

			if ( index === this.state.currentPage ) {
				textViewStyles['borderBottomColor'] = 'white';
				textViewStyles['borderBottomWidth'] = 3;
				textViewStyles['borderStyle'] = 'solid';
			}

			return (
				<TouchableNativeFeedback key={ index } onPress={() => {
					let curIndex = index;
					this.selectTab( curIndex );
				}} >
					<View style={{paddingBottom: 5}} >

						<View style={textViewStyles} ></View>
						<Text 
							style={{
								width:this.state.tabTitleWidth,
								fontSize: 19,
								color: 'white',
								textAlign: 'center',
							}} >
							{ component.props.name ? component.props.name : 'unnamed' }
						</Text>
					</View>
				</TouchableNativeFeedback>
			)
		});

		return (
			<View onLayout={this.onLayoutView}>
				<ScrollView horizontal={ true } contentContainerStyle={st.tabTitlesView}>
					{ tabs }
				</ScrollView>
				{ this.props.children[this.state.currentPage] }
			</View>
		)
	}
};


export default class ShopperProfileView extends Component {
	render() {

		let profileData = this.props.manager.getDataFB();

		console.log( profileData );

		return (
			<View style={st.container}>

				<ScrollView>
				
					<View style={ st.shopTitleView } >
						<Image source={{uri: 'https://unsplash.it/600/100?image=147'}} style={st.imgTitle}/>
						<View style={st.shopTitleProfileBlock}>

							<View style={st.shopperTitleIcon}>
								<Image source={require('../../assets/img/ic_settings.png')} style={st.profileImgIcon}/>
							</View>

							<View style={st.shopperTitleProfile}>
								<Image source={{uri: 'https://unsplash.it/100/100?image=158'}} style={st.shopProfileImg}/>
								<Text style={ st.shopProfileName } >William Reid</Text>
							</View>

							<View style={st.shopperTitleIcon}>
								<Image source={require('../../assets/img/ic_settings.png')} style={st.profileImgIcon}/>
							</View>

						</View>
					</View>

					<Tabs>
						<View name={'PERSONAL'} >
							<View style={st.contentWrap} >
								<Text style={st.blockSubtitle} >ADD NEW PRODUCT</Text>

								<Text style={st.textInputGrey} >First name:</Text>
								<TextInput 
									style={st.input} 
									placeholder={'Test name'} 
									underlineColorAndroid="#edb4ff" 
									placeholderTextColor='#cccccc'
									value={profileData.first_name}
									/>
								<Text style={st.textInputGrey} >Last name:</Text>
								<TextInput 
									style={st.input} 
									placeholder={'Mens Brogue Shoe'} 
									underlineColorAndroid="#edb4ff" 
									placeholderTextColor='#cccccc'
									value={profileData.last_name}
									/>

								<Text style={st.textInputGrey} >Email address:</Text>
								<TextInput 
									style={st.input} 
									placeholder={'Mens Brogue Shoe'} 
									underlineColorAndroid="#edb4ff" 
									placeholderTextColor='#cccccc'
									/>

								<Text style={st.textInputGrey} >Phone number:</Text>
								<TextInput 
									style={st.input} 
									placeholder={'Mens Brogue Shoe'} 
									underlineColorAndroid="#edb4ff" 
									placeholderTextColor='#cccccc'
									/>

								<Text style={st.textInput} >About</Text>
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
						</View>
						<View name={'PAYMENT'}>
						<View style={st.contentWrap} >
							<Text style={st.blockSubtitle} >MY CARDS</Text>

							<View style={st.cardRow}>
							
								<View style={st.cardImageWrap}>
									<Image 
										style={st.cardImage}
										source={require('../../assets/img/visa-icon.jpg')}
									/>
								</View>

								<Text style={st.cardTextNumber}>****5734</Text>
	
							</View>

							<View style={st.cardRow}>
							
								<View style={st.cardImageWrap}>
									<Image 
										style={st.cardImage}
										source={require('../../assets/img/mastercard-icon.jpg')}
									/>
								</View>
								<Text style={st.cardTextNumber}>****5734</Text>
							</View>
						</View>

						<View style={st.contentWrap} >
							<Text style={st.blockSubtitle} >NEW PAYMENT DETAILS</Text>

							<CheckboxList>
							<View>
								<Image 
									style={st.chBoxCardImage}
									source={require('../../assets/img/visa-icon.jpg')}
								/>
							</View>
							<View>
								<Image 
									style={st.chBoxCardImage}
									source={require('../../assets/img/mastercard-icon.jpg')}
								/>
							</View>
							<View>
								<Image 
									style={st.chBoxCardImage}
									source={require('../../assets/img/visa-icon.jpg')}
								/>
							</View>
							</CheckboxList>



							<Text style={st.textInput} >Card Name</Text>
							<TextInput 
								style={st.input} 
								placeholder={'Mens Brogue Shoe'} 
								underlineColorAndroid="#edb4ff" 
								placeholderTextColor='#cccccc'
								/>

							<Text style={st.textInput} >Card Number</Text>
							<TextInput 
								style={st.input} 
								placeholder={'Mens Brogue Shoe'} 
								underlineColorAndroid="#edb4ff" 
								placeholderTextColor='#cccccc'
								/>

							<Text style={st.textInput} >Exp Date</Text>
							<TextInput 
								style={st.input} 
								placeholder={'Mens Brogue Shoe'} 
								underlineColorAndroid="#edb4ff" 
								placeholderTextColor='#cccccc'
								/>

							<Text style={st.textInput} >CW code</Text>
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
									<Text style={st.purpleButtonName} >SAVE CARD</Text>
								</View>
							</TouchableNativeFeedback>
						</View>
						</View>
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