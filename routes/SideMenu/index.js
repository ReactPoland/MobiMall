import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	TextInput,
	TouchableNativeFeedback,
	ScrollView,
	Alert,
	Dimensions,
	NativeModules,
	AsyncStorage
} from 'react-native';
import { bindMethods } from '../../utils';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SettingsList from 'react-native-settings-list';
import routes from '../routes'

export default class Setting extends Component {

	constructor(prop) {
		super(prop);
		bindMethods(this);

		this.state = {
			fields: {}
		}
	}

	changeField(fieldName, val) {

		let newFields = Object.assign({}, this.state.fields );
		newFields[fieldName] = val;
		this.setState( { fields:newFields } );
	}

	changeUserProfile() {
		if (this.props.manager.getUserProfile() == 'seller' ) this.setBuyerProfile();
		else this.setSellerProfile();

	}

	setBuyerProfile() {
		this.props.manager.setUserProfile('buyer');
		this.props.navigator.replaceAtIndex(routes.dashboardBuyer, 0, () => { this.props.navigator.popToTop() } );
	}

	setSellerProfile() {
		this.props.manager.setUserProfile('seller');
		this.props.navigator.replaceAtIndex(routes.dashboardSeller, 0, () => { this.props.navigator.popToTop() } );
	}

	render() {

		const { logoutHandler, removeAccountHandler, manager, logoutFromAllAccounts } = this.props;
		const { fields } = this.state;

		return (
			<View style={setting.container} >
				<ScrollView style={setting.scrollContainer}>
					
					<View style={{borderBottomWidth:1, backgroundColor:'#263238',borderColor:'#c8c7cc'}}>
					  <Text style={{color:'white',marginTop:15,marginBottom:15, marginLeft:15,fontWeight:'bold',fontSize:20}}>Options</Text>
					</View>

					<SettingsList borderColor='#d6d5d9' defaultItemSize={50} >
					<SettingsList.Header headerText='Settings' headerStyle={{marginTop:20}}/>

		            {/*<SettingsList.Item
		              icon={
		                <View style={setting.imageStyle}>
		                  <Image style={{alignSelf:'center',height:22, width:22}} source={ { uri: 'https://unsplash.it/30/30?image=45' } }/>
		                </View>
		              }
		              hasNavArrow={false}
		              itemWidth={70}
		              titleStyle={{color:'black', fontSize: 16}}
		              title='Data usage'
		            />*/}

		            <SettingsList.Item
	                    hasNavArrow={false}
	                    switchState={ manager.getUserProfile() == 'seller' }
	                    hasSwitch={true}
	                    title='Buyer/Seller'
	                    switchOnValueChange={(ev) => { this.changeUserProfile() }}
	                    />

	                <SettingsList.Item hasNavArrow={false} title="Upgrade Account" />
	                <SettingsList.Item hasNavArrow={false} title="Verify Account" />
	                <SettingsList.Item hasNavArrow={false} title="Change Password" />
	                <SettingsList.Item hasNavArrow={false} title="Language" />
	                <SettingsList.Item hasNavArrow={false} title="Change Country" />
	                <SettingsList.Item hasNavArrow={false} title="Push Notifications" />
	                <SettingsList.Item hasNavArrow={false} title="Invite Friends" />
	                <SettingsList.Item hasNavArrow={false} title="App Updates" />

					<SettingsList.Header headerStyle={{marginTop:50}}/>

	                <SettingsList.Item hasNavArrow={false} title="Sign Out" onPress={ logoutHandler } />
	                <SettingsList.Item hasNavArrow={false} title="Sign Out of all accounts" onPress={ logoutFromAllAccounts } />
	                <SettingsList.Item hasNavArrow={false} title="Remove account" onPress={ removeAccountHandler } />


					<SettingsList.Header headerText='Support' headerStyle={{marginTop:50}}/>
	                <SettingsList.Item hasNavArrow={false} title="Help & About" />
	                <SettingsList.Item hasNavArrow={false} title="Dispute Resolution" />
	                <SettingsList.Item hasNavArrow={false} title="Report a Problem" />

					<SettingsList.Header headerText='About' headerStyle={{marginTop:50}}/>
					<SettingsList.Item hasNavArrow={false} title="Contact Us" />
					<SettingsList.Item hasNavArrow={false} title="Privacy Policy" />
					<SettingsList.Item hasNavArrow={false} title="Terms & Conditions" />

					</SettingsList>
					
				</ScrollView>
			</View>
		)
	}
}

const setting = StyleSheet.create({
	
	container: {
		flex: 1,
		backgroundColor: `white`,
	},
	imageStyle:{
	    marginLeft:15,
	    marginRight:20,
	    alignSelf:'center',
	    width:20,
	    height:24,
	    justifyContent:'center'
	},
	scrollContainer: {
		// paddingLeft: 20,
		// paddingRight: 20,		
	}

});
