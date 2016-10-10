import React from 'react';
import { Button } from 'react-native-material-design';

const PurpleButton = ({ text, onPress }) => (
  <Button text={text}
    raised={true}
    overrides={{
    backgroundColor: '#9100be',
    textColor: '#ffffff' }}
    onPress={onPress}
  />
);

export default PurpleButton;
