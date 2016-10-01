import React from 'react';
import st from '../assets/style';
import {
  View,
  Image,
  Text
} from 'react-native';

const visaIcon = require('../assets/img/visa-icon.jpg');
const masterCardIcon = require('../assets/img/mastercard-icon.jpg');

const CardRow = ({ cardData }) => {
	const { last4, brand } = cardData;
	return (
		<View style={st.cardRow}>
			<View style={st.cardImageWrap}>
				<Image
					style={st.cardImage}
					source={brand === 'Visa' ? visaIcon : masterCardIcon}
				/>
			</View>
			<Text style={st.cardTextNumber}>**** {last4}</Text>
		</View>
	);
};

export default CardRow;
