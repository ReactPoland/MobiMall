import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback
} from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';

import st from '../assets/style';

const AddressInput = ({ onChange, addressToEdit }) => {
  // const handler = prop => e => onChange(prop, e.nativeEvent.text);
  const handler = () => console.log('asd');
  const {
    country = '',
    address = '',
    postalCode = '',
    city = '',
    bestTimeToDeliver = ''
  } = (addressToEdit || {});

  return (
    <View style={st.contentWrap}>
      <Text style={st.blockSubtitle}>{addressToEdit ? 'EDIT' : 'ADD'} ADDRESS</Text>
      <Sae
        label={'Country'}
        iconClass={FontAwesomeIcon}
        iconName={'pencil'}
        iconColor={'gray'}
        inputStyle={st.textInputGrey}
        autoCapitalize={'none'}
        autoCorrect={false}
        onChange={() => console.log('asd')}
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
        // onChange={handler('address')}
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
        // onChange={handler('postalCode')}
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
        // onChange={handler('city')}
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
        // onChange={handler('bestTimeToDeliver')}
        value={bestTimeToDeliver}
      />

      <TouchableNativeFeedback
        onPress={this._onAddressSave} >
        <View style={st.purpleButtonView} >
          <Text style={st.purpleButtonName} >SAVE ADDRESS</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

export default AddressInput;
