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
                  DEFAULT ADDRESS
                </Text>
              )
              : null
            : null
          }
          <View style={{ 
            borderBottomColor: '#D3D3D3', 
            borderBottomWidth: 1, 
            flexDirection:'row', 
            flex: 1, 
            marginLeft: 5, 
            justifyContent: 'center', 
            alignItems: 'center',
            paddingBottom: 5,
          }} >
            
            <Text style={{ fontSize: 15, flex: 1 }}>{address}, {postalCode} {city}, {country}</Text>

            <TouchableNativeFeedback onPress={deleteHandler(i)}>
              <View>
                <Text style={{ fontSize: 20 }}>&#10005;</Text>
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
