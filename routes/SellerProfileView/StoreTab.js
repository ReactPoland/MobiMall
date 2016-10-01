import React from 'react';
import {
  View,
  Text
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';

import st from '../../assets/style';

const StoreTab = () => (
  <View style={st.contentWrap} >
    <Sae
      label={'Company Name'}
      iconClass={FontAwesomeIcon}
      iconName={'pencil'}
      iconColor={'gray'}
      inputStyle={st.textInputGrey}
      autoCapitalize={'none'}
      autoCorrect={false}
    />
  </View>
);

export default StoreTab;
