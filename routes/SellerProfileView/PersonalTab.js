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
        
        <Text style={st.textInput2} >First name</Text>

        <View>
          <Text style={[st.textInputGrey, {paddingTop: 5, paddingBottom: 9}]} >{firstName}</Text>
        </View>

        <Text style={st.textInput2} >About</Text>

        <TextInput
          inputStyle={st.textInputGrey}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChange={onPersonalInfoChange.bind(this, 'about')}
          value={about}
          multiline={true}
        />

        <PurpleButton text={saving ? 'SAVING...' : 'SAVE'} onPress={onSave} />
      </Card.Body>
    </Card>
  );
}

export default PersonalTab;
