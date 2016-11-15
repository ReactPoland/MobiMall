import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  TextInput
} from 'react-native';
import { Card } from 'react-native-material-design';
import { Button } from 'react-native-material-ui';

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

        <Text style={st.textInput2} >Country</Text>

        <TextInput
          underlineColorAndroid={'#ccc'}
          inputStyle={st.textInputGrey}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChange={handler("country")}
          value={country}
        />

        <Text style={st.textInput2} >Address</Text>

        <TextInput
          underlineColorAndroid={'#ccc'}
          inputStyle={st.textInputGrey}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChange={handler('address')}
          value={address}
        />

        <Text style={st.textInput2} >ZIP / Postal Code</Text>
        
        <TextInput
          underlineColorAndroid={'#ccc'}
          inputStyle={st.textInputGrey}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChange={handler('postalCode')}
          value={postalCode}
        />
 
        <Text style={st.textInput2} >City</Text>

        <TextInput
          underlineColorAndroid={'#ccc'}
          inputStyle={st.textInputGrey}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChange={handler('city')}
          value={city}
        />

        <Text style={st.textInput2} >Best Time of Day to Deliver</Text>

        <TextInput
          underlineColorAndroid={'#ccc'}
          inputStyle={st.textInputGrey}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChange={handler('bestTimeToDeliver')}
          value={bestTimeToDeliver}
        />

        <Button 
          text='SAVE ADDRESS'
          raised
          style={{
            container: {
              backgroundColor: '#9100be',
            },
            text: {
              color: '#ffffff'
            }
          }}
          onPress={onSave}
        />
      </Card.Body>
    </Card>
  );
}

export default AddressInput;
