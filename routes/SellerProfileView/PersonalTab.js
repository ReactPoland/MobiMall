import React from 'react';
import {
  View,
  Text
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';

import st from '../../assets/style';

const PersonalTab = () => (
  <View style={st.contentWrap} >
    <Text style={st.blockSubtitle} >PERSONAL DETAILS</Text>

    <Sae
      label={'First Name'}
      iconClass={FontAwesomeIcon}
      iconName={'pencil'}
      iconColor={'gray'}
      inputStyle={st.textInputGrey}
      autoCapitalize={'none'}
      autoCorrect={false}
    />

    <Sae
      label={'Last Name'}
      iconClass={FontAwesomeIcon}
      iconName={'pencil'}
      iconColor={'gray'}
      autoCapitalize={'none'}
      autoCorrect={false}
    />

    <Sae
      label={'Email 1'}
      iconClass={FontAwesomeIcon}
      iconName={'pencil'}
      iconColor={'gray'}
      autoCapitalize={'none'}
      autoCorrect={false}
    />

    <Sae
      label={'Email 2'}
      iconClass={FontAwesomeIcon}
      iconName={'pencil'}
      iconColor={'gray'}
      autoCapitalize={'none'}
      autoCorrect={false}
    />

    <Sae
      label={'Phone number'}
      iconClass={FontAwesomeIcon}
      iconName={'pencil'}
      iconColor={'gray'}
      autoCapitalize={'none'}
      autoCorrect={false}
    />

  </View>
);

export default PersonalTab;
