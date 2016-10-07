import React from 'react';
import {
  View,
  Text
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import { Card } from 'react-native-material-design';

import CardsManager from '../../components/CardsManager';
import st from '../../assets/style';

const AccountsTab = ({ fbId, onBankAccountDataChange, bankAccountData }) => {
  const { bankName = '', softCode = '', accountNumber = '', accountName = '' } = bankAccountData;

  return (
    <View>
      <Card >
        <Text style={st.blockSubtitle}>PAY SALE FROM MY STORE INTO</Text>
        <Sae
          label={'Bank Name'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.textInputGrey}
          autoCapitalize={'none'}
          autoCorrect={false}
          onEndEditing={onBankAccountDataChange.bind(this, 'bankName')}
          value={bankName}
        />

        <Sae
          label={'Soft Code'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.textInputGrey}
          autoCapitalize={'none'}
          autoCorrect={false}
          onEndEditing={onBankAccountDataChange.bind(this, 'softCode')}
          value={softCode}
        />

        <Sae
          label={'Account Number'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.textInputGrey}
          autoCapitalize={'none'}
          autoCorrect={false}
          onEndEditing={onBankAccountDataChange.bind(this, 'accountNumber')}
          value={accountNumber}
        />

        <Sae
          label={'Account Name'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.textInputGrey}
          autoCapitalize={'none'}
          autoCorrect={false}
          onEndEditing={onBankAccountDataChange.bind(this, 'accountName')}
          value={accountName}
        />
      </Card>
      <CardsManager fbId={fbId} />
    </View>
  );
}

export default AccountsTab;
