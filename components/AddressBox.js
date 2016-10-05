import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback
} from 'react-native';

import st from '../assets/style';

const AddressBox = ({ addresses, loading, onPress, mode }) => {
  const handler = index => onPress(index);
  const addressesNumber = addresses.length;
  const getContent = () => {
    if(loading) return <Text>Loading...</Text>;
    if(addressesNumber === 0) return <Text>No address added yet!</Text>;
    if(addressesNumber > 0) return addresses.map(({ address, postalCode, city, country }, i) => (
      <TouchableNativeFeedback onPress={handler(i)} key={i}>
        <View style={{ borderBottomColor: '#D3D3D3', borderBottomWidth: 1 }}>
          {
            mode === 'LogisticsTab'
            ? (
              <Text style={{ fontSize: 10, color: '#9100be', paddingTop: 5 }} >
                {i === 0 ? 'Primary Address' : 'Secondary Address'}
              </Text>
            )
            : null
          }
          {
            mode === 'ShippingTab'
            ? i === 0
              ? (
                <Text style={{ fontSize: 10, color: '#9100be', paddingTop: 5 }} >
                  Default Address
                </Text>
              )
              : null
            : null
          }
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
}

export default AddressBox;
