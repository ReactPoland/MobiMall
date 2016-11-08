import React, { Component } from 'react';
import st from '../../assets/style';
import {
	Text,
	View,
	StyleSheet,
	Image,
	TextInput,
	TouchableNativeFeedback,
	Alert,
	ScrollView
} from 'react-native';

import ProfileHeader from '../../components/ProfileHeader';
import Tabs from '../../components/Tabs';
import { api, bindMethods, auth0lock } from '../../utils';

import PersonalTab from './PersonalTab';
import StoreTab from './StoreTab';
import AccountsTab from './AccountsTab';
import LogisticsTab from './LogisticsTab';
import SellerProfileHeader from '../../components/SellerProfileHeader'
var CookieManager = require('react-native-cookies');

export default class SellerProfileView extends Component {
	constructor (props) {
		super(props);
		bindMethods(this);
		this.state = {
			fbId: this.props.manager.getDataFB().id,
			personalData: {},
			bankAccountData: {},
			saving: false
		};
	}

	componentDidMount () {
		api
			.getPersonalInfo(this.state.fbId)
			.then(({ data }) => this.setState({ personalData: data }))
			.catch(e => console.log('err'));
		api
			.getBankAccountData(this.state.fbId)
			.then(({ data }) => {
				this.setState({ bankAccountData: data })
			})
			.catch(e => console.log('err', e));
	}

	_onPersonalInfoChange (property, event) {
		const personalData = Object.assign({}, this.state.personalData);
		personalData[property] = event.nativeEvent.text;
		this.setState({ personalData });
	}

	_onBankAccountDataChange (property, event) {
		console.log('property', property);
		console.log('event text', event.nativeEvent.text);
		const bankAccountData = Object.assign({}, this.state.bankAccountData);
		bankAccountData[property] = event.nativeEvent.text;
		api
			.saveBankAccountData(this.state.fbId, bankAccountData)
			.catch(e => console.log(e));
		console.log('bAD after change', bankAccountData);
		this.setState({ bankAccountData });
	}

	_onPersonalInfoSave () {
		const { profileData } = this.state;
		this.setState({ saving: true });
		api
			.updatePersonalInfo(this.state.fbId, profileData)
			.then(() => this.setState({ saving: false }))
			.catch(e => console.log(e));
	}

	_onLoginStore() {
		auth0lock.show({}, (err, profile, token) => {
			if (err) {
				console.log( err );
				Alert.alert(err.message);
				return;
			};

			CookieManager.clearAll((err, res) => {} );

			let igStoreId = 0;

			profile.identities.map(connItem => {
				if (connItem.provider == 'instagram') {
					igStoreId = connItem.userId;
				}
			});



			let newStoreProfile = {
				id: igStoreId,
				description: profile.bio,
				companyName: profile.name,
				igHandle: `@${profile.nickname}`,
				storeImgUri: profile.picture,
				website: profile.website
			};

			api.updatePersonalStore(this.state.fbId, newStoreProfile )
				.then( ( {data} ) => {

					if (data.status == 'ok') {
						let dataFB = this.props.manager.getDataFB();
						dataFB.store = data.value;
						this.props.manager.authFB(dataFB);
						this.forceUpdate();
					} else {
						Alert.alert(data.mess);
					}
				} )
				.catch((e) => console.log(e));
		})
	}

	_onLogoutStore() {
		api.updatePersonalStore(this.state.fbId, null)
			.then( ( {data} ) => {
				if (data.status == 'ok') {
					let dataFB = this.props.manager.getDataFB();
					dataFB.store = null;
					this.props.manager.authFB( dataFB );
					this.props.manager.setSellerProductList( null );
					this.forceUpdate();
				} else {
					Alert.alert( data.mess );
				}
			} )
			.catch((e) => console.log(e));
	}

  render () {
		const { fbId, bankAccountData, saving } = this.state;
		const { firstName } = this.state.personalData;
		const { name, store } = this.props.manager.getDataFB();
		const igHandle = store ? store.igHandle : null;
		const followers = store ? store.follower_count : null;

    return (
			<View style={st.container}>
				<ScrollView>
				
					<SellerProfileHeader name={ igHandle } followers={followers } /> 

          {/*<ProfileHeader
						name={name}
						fbId={fbId}
					/>*/}
					<Tabs>
            			<PersonalTab
							name='PERSONAL'
							personalData={this.state.personalData}
							fbData={this.props.manager.getDataFB()}
							onPersonalInfoChange={this._onPersonalInfoChange}
							saving={saving}
							onSave={this._onPersonalInfoSave}
						/>
						<StoreTab name='STORE' storeItem={store} onLogin={this._onLoginStore} onLogout={this._onLogoutStore} />
						<AccountsTab
							name='ACCOUNTS'
							fbId={fbId}
							bankAccountData={bankAccountData}
							onBankAccountDataChange={this._onBankAccountDataChange}
						/>
						<LogisticsTab
							name='LOGISTICS'
							fbId={fbId}
						/>
					</Tabs>
				</ScrollView>
			</View>
		);
  }
}
