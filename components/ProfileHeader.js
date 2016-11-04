import React from 'react';
import st from '../assets/style';
import {
  View,
  Image,
  Text
} from 'react-native';

const ProfileHeader = ({ name, fbId }) => (
  <View style={ st.shopTitleView } >
    <Image source={{uri: 'http://pipsum.com/600x100.jpg'}} style={st.imgTitle}/>
    <View style={st.shopTitleProfileBlock}>

      <View style={st.shopperTitleIcon}>
        <Image source={require('../assets/img/ic_settings.png')} style={st.profileImgIcon}/>
      </View>

      <View style={st.shopperTitleProfile}>
        <Image source={{uri: `http://graph.facebook.com/${fbId}/picture?type=large` }} style={st.shopProfileImg}/>
        <Text style={ st.shopProfileName } >{name}</Text>
      </View>

      <View style={st.shopperTitleIcon}>
        <Image source={require('../assets/img/ic_settings.png')} style={st.profileImgIcon}/>
      </View>

    </View>
  </View>
);

export default ProfileHeader;
