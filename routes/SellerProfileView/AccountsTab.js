import React from 'react';
import {
  View,
  Text,
  TextInput
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import { Card } from 'react-native-material-design';
import PurpleButton from '../../components/PurpleButton';

import CardsManager from '../../components/CardsManager';
import st from '../../assets/style';

const AccountsTab = ({ fbId, onBankAccountDataChange, bankAccountData, onSave, saving }) => {
  const { bankName = '', softCode = '', accountNumber = '', accountName = '' } = bankAccountData;

  return (
    <View>
      <Card >
        <Card.Body>
          <Text style={st.blockSubtitle}>PAY SALE FROM MY STORE INTO</Text>

          <Text style={st.textInput2} >Bank Name</Text>

          <TextInput
            inputStyle={st.textInputGrey}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChange={onBankAccountDataChange.bind(this, 'bankName')}
            value={bankName}
          />

          <Text style={st.textInput2} >Soft Code</Text>

          <TextInput
            inputStyle={st.textInputGrey}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChange={onBankAccountDataChange.bind(this, 'softCode')}
            value={softCode}
          />

          <Text style={st.textInput2} >Account Number</Text>

          <TextInput
            inputStyle={st.textInputGrey}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChange={onBankAccountDataChange.bind(this, 'accountNumber')}
            value={accountNumber}
          />

          <Text style={st.textInput2} >Account Name</Text>

          <TextInput
            inputStyle={st.textInputGrey}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChange={onBankAccountDataChange.bind(this, 'accountName')}
            value={accountName}
          />

          <PurpleButton text={ saving ? 'SAVING...' : 'SAVE'} onPress={onSave} />

        </Card.Body>
      </Card>
      <CardsManager fbId={fbId} />
    </View>
  );
}

export default AccountsTab;
