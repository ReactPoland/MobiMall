import React from 'react';
import {
  View,
  Text
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';

import st from '../../assets/style';

const PersonalTab = ({ personalData, onPersonalInfoChange }) => {
  console.log('per', personalData)
  const { firstName, lastName, email, email2, phone } = personalData;
  return (
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
        onEndEditing={onPersonalInfoChange.bind(this, 'firstName')}
        value={firstName}
      />

      <Sae
        label={'Last Name'}
        iconClass={FontAwesomeIcon}
        iconName={'pencil'}
        iconColor={'gray'}
        inputStyle={st.textInputGrey}
        autoCapitalize={'none'}
        autoCorrect={false}
        onEndEditing={onPersonalInfoChange.bind(this, 'lastName')}
        value={lastName}
      />

      <Sae
        label={'Email 1'}
        iconClass={FontAwesomeIcon}
        iconName={'pencil'}
        iconColor={'gray'}
        inputStyle={st.textInputGrey}
        autoCapitalize={'none'}
        autoCorrect={false}
        onEndEditing={onPersonalInfoChange.bind(this, 'email')}
        value={email}
      />

      <Sae
        label={'Email 2'}
        iconClass={FontAwesomeIcon}
        iconName={'pencil'}
        iconColor={'gray'}
        inputStyle={st.textInputGrey}
        autoCapitalize={'none'}
        autoCorrect={false}
        onEndEditing={onPersonalInfoChange.bind(this, 'email2')}
        value={email2}
      />

      <Sae
        label={'Phone number'}
        iconClass={FontAwesomeIcon}
        iconName={'pencil'}
        iconColor={'gray'}
        inputStyle={st.textInputGrey}
        autoCapitalize={'none'}
        autoCorrect={false}
        onEndEditing={onPersonalInfoChange.bind(this, 'phone')}
        value={phone}
      />

    </View>
  );
}

export default PersonalTab;