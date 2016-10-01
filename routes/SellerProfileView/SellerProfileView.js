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

import PersonalTab from './PersonalTab';
import StoreTab from './StoreTab';
import AccountsTab from './AccountsTab';
import LogisticsTab from './LogisticsTab';

export default class SellerProfileView extends Component {
	constructor (props) {
		super(props);
		this.fbId = this.props.manager.getDataFB().id;
	}

  render () {
    return (
			<View style={st.container}>
				<ScrollView>
          <ProfileHeader />
					<Tabs>
            <PersonalTab name='PERSONAL' />
						<StoreTab name='STORE' />
						<AccountsTab name='ACCOUNTS' fbId={this.fbId} />
						<LogisticsTab name='LOGISTICS' />
					</Tabs>
				</ScrollView>
			</View>
		);
  }
}
