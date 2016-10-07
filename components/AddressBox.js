import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback
} from 'react-native';
import { Card } from 'react-native-material-design';

import st from '../assets/style';

const AddressBox = ({ addresses, loading, onPress, onDelete, mode }) => {
  const handler = index => () => onPress(index);
  const deleteHandler = index => () => onDelete(index);
  const addressesNumber = addresses.length;
  const getContent = () => {
    if(loading) return <Text>Loading...</Text>;
    if(addressesNumber === 0) return <Text>No address added yet!</Text>;
    if(addressesNumber > 0) return addresses.map(({ address, postalCode, city, country }, i) => (
      <TouchableNativeFeedback onPress={handler(i)} key={i}>
        <View>
          {
            mode === 'LogisticsTab'
            ? (
              <Text style={st.blockSubtitle} >
                {i === 0 ? 'PRIMARY BUSSINESS ADDRESS' : 'SECONDARY ADDRESS'}
              </Text>
            )
            : null
          }
          {
            mode === 'ShippingTab'
            ? i === 0
              ? (
                <Text style={st.blockSubtitle} >
                  Default Address
                </Text>
              )
              : null
            : null
          }
          <View style={{ flexDirection: 'row', position: 'relative' }}>
            <View style={{ borderBottomColor: '#D3D3D3', borderBottomWidth: 1, marginRight: 30, flex: 1 }}>
              <Text style={{ paddingBottom: 5, fontSize: 15, flex: 1 }}>{address}, {postalCode} {city}, {country}</Text>
            </View>
            <TouchableNativeFeedback onPress={deleteHandler(i)}>
              <View style={{ width: 30, position: 'absolute', right: 0, alignItems: 'center', flexDirection: 'column' }}>
                <Text style={{ fontSize: 30 }}>&#10005;</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </TouchableNativeFeedback>
    ));
  }

  return (
    <Card>
      <Card.Body>
        {getContent()}
      </Card.Body>
    </Card>
  );
}

export default AddressBox;
