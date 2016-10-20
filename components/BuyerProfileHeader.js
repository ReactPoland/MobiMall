import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
} from 'react-native';

const BuyerProfileHeader = ( ) => {

	return (
			<View style={ st.shopTitleView } >
				<View style={st.shopTitleProfileBlock}>

				    <View style={st.shopperImgProfile}>
				    	<Image source={{uri: `http://graph.facebook.com/298288423897442/picture?type=large` }} style={st.shopProfileImg}/>
				    	<Text style={ st.shopperName } >FirstName LastName</Text>
				    </View>

				    <View style={st.shopperPropsProfile} >
					    <View style={st.alignCenter} >
					    	<Text style={st.textPropValue } >106</Text>
					    </View>
					    
				    	<Text style={st.textPropDesc} >Items Bought</Text>
				    </View>

				    <View style={st.shopperPropsProfile} >
					    <View style={st.alignCenter} >
					    	<Text style={st.textPropValue } >47</Text>
					    </View>
					    
					    <Text style={st.textPropDesc} >Items Bought</Text>
				    </View>

			        <View style={st.shopperPropsProfile} >
					    <View style={st.alignCenter} >
			    	    	<Text style={st.textPropValue } >23</Text>
					    </View>
			    	    
			    	    <Text style={st.textPropDesc} >Items Bought</Text>
			        </View>


			  	</View>
		  	</View>
	);
};


const st = StyleSheet.create({
	shopTitleView: {
		justifyContent: 'center',
		paddingHorizontal: 10,
	},
	textPropValue: {
		color: 'black',
		fontSize: 20,
	},
	alignCenter: {
		alignItems: 'center',
	},
	shopTitleProfileBlock: {
		flexDirection: 'row',
		flex: 1,
		zIndex: 20,
		marginTop: 10,
		marginBottom: 10,
	},
	textPropDesc: {
		textAlign: 'center',
		color: 'black',
	},
	shopProfileImg: {
		height: 90,
		width: 90,
		borderRadius: 45,
	},
	shopperImgProfile: {
		flex: 3,
		alignItems: 'center',
	},
	shopperName: {
		textAlign: 'center',
		color: 'black',
	},
	shopperPropsProfile: {
		flex: 2,
		alignItems: 'center',
	},
});



export default BuyerProfileHeader;
