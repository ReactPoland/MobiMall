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

import st from '../../assets/style';

const PersonalTab = ({ personalData, onPersonalInfoChange, saving, onSave, fbData }) => {
  const { email2, phone, about } = personalData;
  const { firstName, lastName, email } = fbData;
  return (
    <Card >
      <Card.Body>
        <Text style={st.blockSubtitle} >PERSONAL DETAILS</Text>
        <TextInput
          label={'First Name'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.input}
          autoCapitalize={'none'}
          editable={false}
          autoCorrect={false}
          value={firstName}
        />

        <TextInput
          label={'Last Name'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.input}
          autoCapitalize={'none'}
          editable={false}
          autoCorrect={false}
          value={lastName}
        />

        <TextInput
          label={'Email 1'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.input}
          autoCapitalize={'none'}
          editable={false}
          autoCorrect={false}
          value={email}
        />

        <TextInput
          label={'Email 2'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.input}
          autoCapitalize={'none'}
          editable={false}
          autoCorrect={false}
          onEndEditing={onPersonalInfoChange.bind(this, 'email2')}
          value={email2}
        />

        <TextInput
          label={'Phone number'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.input}
          autoCapitalize={'none'}
          autoCorrect={false}
          editable={false}
          onEndEditing={onPersonalInfoChange.bind(this, 'phone')}
          value={phone}
        />

        <TextInput
          label={'About'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.input}
          autoCapitalize={'none'}
          autoCorrect={false}
          onEndEditing={onPersonalInfoChange.bind(this, 'about')}
          value={about}
          multiline={true}
          numberOfLines={4}
        />

        <PurpleButton text={saving ? 'SAVING...' : 'SAVE'} onPress={onSave} />
      </Card.Body>
    </Card>
  );
}

export default PersonalTab;
