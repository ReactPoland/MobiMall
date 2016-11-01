import React from 'react';
import {
  View,
  Text,
  Modal
} from 'react-native';

const Fog = ({visible, onRequestClose, children}) => {
  return (
    <Modal 
      visible={ visible }
      animationType = { 'fade' } 
      transparent={ true }
      onRequestClose={ () => { if (onRequestClose) onRequestClose(); } } >

      { children && children.length ? (children) : (

        <View style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: 'center',
            alignItems: 'center',
          }} >

          <Text style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 30,
          }} >LOADING...</Text>

        </View>

      )}


    </Modal>
  )
}

export default Fog;
