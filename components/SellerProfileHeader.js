import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
} from 'react-native';

const SellerProfileHeader = ({ name, pictSource, followers }) => {


	let followersText = followers ?  followers > 1 ? `${followers} FOLLOWERS` : `${followers} FOLLOWER` : null;

	return (
		<View style={st.profileView} >
		   	<Image source={{uri: `http://pipsum.com/600x100.jpg` }} style={st.dealDayImg}/>

		   	<View style={st.profileContent}>
		   		{ name && followersText && (
				   	<View style={st.profileBgBlock}>
				   		<Text style={{color: 'white', textAlign: 'center', fontSize: 26, fontStyle: 'italic', fontWeight: '600'}}>{name}</Text>
				   		<Text style={{color: 'white', textAlign: 'center', fontSize: 18, fontStyle: 'italic'}}>{followersText}</Text>
				   	</View>
		   		) }
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
