import React from 'react';
import {
  View,
  Text,
  TextInput
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import { Card } from 'react-native-material-design';

import st from '../../assets/style';

const StoreTab = () => (
  <Card >
    <Card.Body>
      <TextInput
        label={'Company Name'}
        iconClass={FontAwesomeIcon}
        iconName={'pencil'}
        iconColor={'gray'}
        inputStyle={st.input}
        autoCapitalize={'none'}
        autoCorrect={false}
      />
    </Card.Body>
  </Card>
);

export default StoreTab;
