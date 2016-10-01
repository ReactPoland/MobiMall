import React from 'react';
import {
  View,
  Text
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';

import CardsManager from '../../components/CardsManager';
import st from '../../assets/style';

const AccountsTab = ({ fbId }) => (
  <View>
    <View style={st.contentWrap} >
      <Text style={st.blockSubtitle}>PAY SALE FROM MY STORE INTO</Text>
      <Sae
        label={'Bank Name'}
        iconClass={FontAwesomeIcon}
        iconName={'pencil'}
        iconColor={'gray'}
        inputStyle={st.textInputGrey}
        autoCapitalize={'none'}
        autoCorrect={false}
      />

      <Sae
        label={'Soft Code'}
        iconClass={FontAwesomeIcon}
        iconName={'pencil'}
        iconColor={'gray'}
        autoCapitalize={'none'}
        autoCorrect={false}
      />

      <Sae
        label={'Account Number'}
        iconClass={FontAwesomeIcon}
        iconName={'pencil'}
        iconColor={'gray'}
        autoCapitalize={'none'}
        autoCorrect={false}
      />

      <Sae
        label={'Account Name'}
        iconClass={FontAwesomeIcon}
        iconName={'pencil'}
        iconColor={'gray'}
        autoCapitalize={'none'}
        autoCorrect={false}
      />
    </View>
    <CardsManager fbId={fbId} />
  </View>
);

export default AccountsTab;
