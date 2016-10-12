import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	TextInput,
	TouchableNativeFeedback,
	ScrollView,
	Alert,
	Dimensions,
	NativeModules
} from 'react-native';
import { bindMethods } from '../../utils';
import st from '../../assets/style';


export default class DashboardSeller extends Component {

	constructor(prop) {
		super(prop);
		bindMethods(this);

		this.state = {
			fields: {}
		}
	}

	render() {

		const { fields } = this.state;


		return (
			<View style={dashSellerStyle.container} >
				<ScrollView>

				<View style={ dashSellerStyle.shopTitleView } >
					<View style={st.shopTitleProfileBlock}>

					    <View style={dashSellerStyle.shopperImgProfile}>
					    	<Image source={{uri: `http://graph.facebook.com/298288423897442/picture?type=large` }} style={st.shopProfileImg}/>
					    	<Text >FirstName LastName</Text>
					    </View>

					    <View style={dashSellerStyle.shopperPropsProfile} >
						    <View style={dashSellerStyle.alignCenter} >
						    	<Text>106</Text>
						    </View>
						    
						    <View style={dashSellerStyle.alignCenter} >
						    	<Text>Items Bought</Text>
						    </View>
					    </View>

					    <View style={dashSellerStyle.shopperPropsProfile} >
						    <Text>47{`\n`}</Text>
						    <Text>Items Bought</Text>
					    </View>

				        <View style={dashSellerStyle.shopperPropsProfile} >
				    	    <Text>23{`\n`}</Text>
				    	    <Text>Items Bought</Text>
				        </View>


				  	</View>
				</View>

				<View>

				</View>

					
				</ScrollView>
			</View>
		)
	}
}

const dashSellerStyle = StyleSheet.create({
	shopTitleView: {
		justifyContent: 'center',
		paddingHorizontal: 10,
	},
	container: {
		flex: 1,
		backgroundColor: `white`,
	},
	shopperImgProfile: {
		flex: 2,
		alignItems: 'center',
	},
	shopperPropsProfile: {
		flex: 1,
		alignItems: 'center',
	},
	alignCenter: {
		borderWidth: 2,
	}
});
