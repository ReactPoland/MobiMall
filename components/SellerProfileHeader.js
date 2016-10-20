import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
} from 'react-native';

const SellerProfileHeader = ( ) => {

	return (
		<View style={st.profileView} >
		   	<Image source={{uri: `https://unsplash.it/600/200?image=231` }} style={st.dealDayImg}/>

		   	<View style={st.profileContent}>
			   	<View style={st.profileBgBlock}>
			   		<Text style={{color: 'white', textAlign: 'center', fontSize: 26, fontStyle: 'italic', fontWeight: '600'}}>@SNEAKERHEAVEN</Text>
			   		<Text style={{color: 'white', textAlign: 'center', fontSize: 18, fontStyle: 'italic'}}>5K FOLLOWERS</Text>
			   	</View>
		   	</View>

		</View>
	);
};


const st = StyleSheet.create({
	profileBgBlock: {
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical:4,
		paddingHorizontal: 7,

	},
	profileView: {
		height: 180,
	},
	profileContent: {
		zIndex: 20,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	dealDayImg: {
		zIndex: 10,
		flex: 1,
    	resizeMode: 'cover',
    	top: 0,
    	left: 0,
    	right: 0,
    	bottom: 0,
    	position: 'absolute',
    },
});



export default SellerProfileHeader;
