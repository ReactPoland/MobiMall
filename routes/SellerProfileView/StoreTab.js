import React from 'react';
import {
  View,
  Text
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import { Card } from 'react-native-material-design';

import st from '../../assets/style';

const StoreTab = () => (
  <Card >
    <Sae
      label={'Company Name'}
      iconClass={FontAwesomeIcon}
      iconName={'pencil'}
      iconColor={'gray'}
      inputStyle={st.textInputGrey}
      autoCapitalize={'none'}
      autoCorrect={false}
    />
  </Card>
);

export default StoreTab;
