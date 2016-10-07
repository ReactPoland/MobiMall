import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback
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
      <Text style={st.blockSubtitle}>{isNew ? 'ADD' : 'EDIT'} ADDRESS</Text>
      <Sae
        label={'Country'}
        iconClass={FontAwesomeIcon}
        iconName={'pencil'}
        iconColor={'gray'}
        inputStyle={st.textInputGrey}
        autoCapitalize={'none'}
        autoCorrect={false}
        onChange={handler("country")}
        value={country}
      />

      <Sae
        label={'Address'}
        iconClass={FontAwesomeIcon}
        iconName={'pencil'}
        iconColor={'gray'}
        inputStyle={st.textInputGrey}
        autoCapitalize={'none'}
        autoCorrect={false}
        onChange={handler('address')}
        value={address}
      />

      <Sae
        label={'ZIP / Postal Code'}
        iconClass={FontAwesomeIcon}
        iconName={'pencil'}
        iconColor={'gray'}
        inputStyle={st.textInputGrey}
        autoCapitalize={'none'}
        autoCorrect={false}
        onChange={handler('postalCode')}
        value={postalCode}
      />

      <Sae
        label={'City'}
        iconClass={FontAwesomeIcon}
        iconName={'pencil'}
        iconColor={'gray'}
        inputStyle={st.textInputGrey}
        autoCapitalize={'none'}
        autoCorrect={false}
        onChange={handler('city')}
        value={city}
      />

      <Sae
        label={'Best Time of Day to Deliver'}
        iconClass={FontAwesomeIcon}
        iconName={'pencil'}
        iconColor={'gray'}
        inputStyle={st.textInputGrey}
        autoCapitalize={'none'}
        autoCorrect={false}
        onChange={handler('bestTimeToDeliver')}
        value={bestTimeToDeliver}
      />

      <Button text='SAVE ADDRESS' raised={true} overrides={{
        backgroundColor: '#9100be',
        textColor: '#ffffff'
      }}
      onPress={onSave}
      />
    </Card>
  );
}

export default AddressInput;
