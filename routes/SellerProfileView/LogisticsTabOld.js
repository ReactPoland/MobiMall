import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';

import st from '../../assets/style';
import { bindMethods } from '../../utils';

const AddressBox = ({ addresses, loading, onPress }) => {
  //          addresses array ^
  const addressesNumber = addresses.length;
  const getContent = () => {
    if(loading) return <Text>Loading...</Text>;
    if(addressesNumber === 0) return <Text>No address added yet!</Text>;
    if(addressesNumber > 0) return addresses.map(({ address, postalCode, city, country }, i) => (
      <TouchableNativeFeedback onPress={onPress.bind(this, i)} key={i}>
        <View style={{ borderBottomColor: '#D3D3D3', borderBottomWidth: 1 }}>
          <Text style={{ fontSize: 10, color: '#9100be', paddingTop: 5 }} >
            {i === 0 ? 'Primary Address' : 'Secondary Address'}
          </Text>
          <Text style={{ paddingBottom: 5, fontSize: 15 }}>{address}, {postalCode} {city}, {country}</Text>
        </View>
      </TouchableNativeFeedback>
    ));
  }

  return (
    <View style={st.contentWrap}>
      {getContent()}
    </View>
  );
};

class AddressInput extends Component {
  constructor (props) {
    super(props);
    bindMethods(this);

    this.state = {
      address: '',
      postalCode: '',
      city: '',
      country: '',
      bestTimeToDeliver: ''
    };
  }

  _setProperty (property, e) {
    this.setState({ [property]: e.nativeEvent.text });
  }

  _onAddressSave () {
    this.props.onSave(this.state);
  }

  render () {
    const { country, address, postalCode, city, bestTimeToDeliver } = this.state;
    const { addressToEdit = {} } = this.props;
    console.log('addressToEdit', addressToEdit)
    return (
      <View style={st.contentWrap}>
        <Text style={st.blockSubtitle}>{this.props.addressToEdit ? 'EDIT' : 'ADD'} ADDRESS</Text>
        <Sae
          label={'Country'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.textInputGrey}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChange={this._setProperty.bind(this, 'country')}
          value={country || addressToEdit.country}
        />

        <Sae
          label={'Address'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.textInputGrey}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChange={this._setProperty.bind(this, 'address')}
          value={address || addressToEdit.address}
        />

        <Sae
          label={'ZIP / Postal Code'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.textInputGrey}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChange={this._setProperty.bind(this, 'postalCode')}
          value={postalCode || addressToEdit.postalCode}
        />

        <Sae
          label={'City'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.textInputGrey}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChange={this._setProperty.bind(this, 'city')}
          value={city || addressToEdit.city}
        />

        <Sae
          label={'Best Time of Day to Deliver'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.textInputGrey}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChange={this._setProperty.bind(this, 'bestTimeToDeliver')}
          value={bestTimeToDeliver || addressToEdit.bestTimeToDeliver}
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
}

const LogisticsTab = ({ addresses, saveAddresses, setAddressToEdit, addressToEdit }) => {
  console.log('addresses', addresses)
  return (
    <View>
      <AddressBox addresses={addresses} onPress={setAddressToEdit} test={console.log('add', addresses)}/>
      {
        addresses.length >= 2 && !addressToEdit
        ? null
        : <AddressInput onSave={saveAddresses} addressToEdit={addressToEdit} />
      }
    </View>
  );

}

export default LogisticsTab;
