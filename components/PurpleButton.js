import React from 'react';
import { Button } from 'react-native-material-ui';

const PurpleButton = ({ text, onPress }) => (
  <Button 
  	text={text}
    raised={true}
    style={{
    	container: {
    		backgroundColor: '#9100be',
    	},
    	text: {
		    color: '#ffffff' 
    	}
	}}
    onPress={onPress}
  />
);

export default PurpleButton;
