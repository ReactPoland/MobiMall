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

import ProfileHeader from '../../components/ProfileHeader';
import Tabs from '../../components/Tabs';
import { api, bindMethods } from '../../utils';

import PersonalTab from './PersonalTab';
import StoreTab from './StoreTab';
import AccountsTab from './AccountsTab';
import LogisticsTab from './LogisticsTab';

export default class SellerProfileView extends Component {
	constructor (props) {
		super(props);
		bindMethods(this);
		this.state = {
			fbId: this.props.manager.getDataFB().id,
			personalData: {},
			bankAccountData: {}
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
				console.log('asdasdasdas', typeof data);
			})
			.catch(e => console.log('err'));
	}

	_onPersonalInfoChange (property, event) {
		const personalData = Object.assign({}, this.state.personalData);
		personalData[property] = event.nativeEvent.text;
		api
			.updatePersonalInfo(this.state.fbId, personalData)
			.catch(e => console.log(e));
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

  render () {
		const { fbId, bankAccountData } = this.state;
		console.log('data', bankAccountData);
    return (
			<View style={st.container}>
				<ScrollView>
          <ProfileHeader />
					<Tabs>
            <PersonalTab
							name='PERSONAL'
							personalData={this.state.personalData}
							onPersonalInfoChange={this._onPersonalInfoChange}
						/>
						<StoreTab name='STORE' />
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
