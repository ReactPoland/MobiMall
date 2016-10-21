import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  TextInput
} from 'react-native';
import { Button, Card } from 'react-native-material-design';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';

import st from '../assets/style';

const AddressInput = ({ onChange, addressToEdit, onSave, shouldDisplay, isNew }) => {
  if (!shouldDisplay) return null;
  const handler = prop => e => onChange(prop, e.nativeEvent.text);
  const {
    country,
    address,
    postalCode,
    city,
    bestTimeToDeliver
  } = addressToEdit;

  return (
    <Card>
      <Card.Body>
        <Text style={st.blockSubtitle}>{isNew ? 'ADD' : 'EDIT'} ADDRESS</Text>
        <TextInput
          label={'Country'}
          labelStyle={{ fontSize: 15 }}
          style={{ height: 20 }}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.input}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChange={handler("country")}
          value={country}
        />

        <TextInput
          label={'Address'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.input}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChange={handler('address')}
          value={address}
        />

        <TextInput
          label={'ZIP / Postal Code'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.input}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChange={handler('postalCode')}
          value={postalCode}
        />

        <TextInput
          label={'City'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.input}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChange={handler('city')}
          value={city}
        />

        <TextInput
          label={'Best Time of Day to Deliver'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.input}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChange={handler('bestTimeToDeliver')}
          value={bestTimeToDeliver}
        />

        <Button text='SAVE ADDRESS'
          raised={true}
          overrides={{
          backgroundColor: '#9100be',
          textColor: '#ffffff' }}
        onPress={onSave}
        />
      </Card.Body>
    </Card>
  );
}

export default AddressInput;
