import React from 'react';
import st from '../assets/style';
import {
  View,
  Image,
  Text,
  TouchableNativeFeedback
} from 'react-native';

const visaIcon = require('../assets/img/visa-icon.jpg');
const masterCardIcon = require('../assets/img/mastercard-icon.jpg');

const CardRow = ({ cardData, onDelete }) => {
	const { last4, brand, id } = cardData;
	return (
		<View style={st.cardRow}>
			<View style={st.cardImageWrap}>
				<Image
					style={st.cardImage}
					source={brand === 'Visa' ? visaIcon : masterCardIcon}
				/>
			</View>
			<Text style={st.cardTextNumber}>**** {last4}</Text>
      <TouchableNativeFeedback onPress={() => onDelete(id)}>
        <View>
          <Text style={{ fontSize: 30 }}>&#10005;</Text>
        </View>
      </TouchableNativeFeedback>
		</View>
	);
};

export default CardRow;
