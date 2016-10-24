import React from 'react';
import {
  View,
  Text,
} from 'react-native';

const Fog = () => {
  return (
    <View style={{
        // position: 'absolute',
        // zIndex: 300,
        // top: 0,
        // bottom: 0,
        // left: 0,
        // right: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }} >
      <Text style={{
        textAlign: 'center',
        fontSize: 20,
      }}>LOADING...</Text>

    </View>
  )
}

export default Fog;
