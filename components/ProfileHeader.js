import React from 'react';
import st from '../assets/style';
import {
  View,
  Image,
  Text
} from 'react-native';

const ProfileHeader = () => (
  <View style={ st.shopTitleView } >
    <Image source={{uri: 'https://unsplash.it/600/100?image=147'}} style={st.imgTitle}/>
    <View style={st.shopTitleProfileBlock}>

      <View style={st.shopperTitleIcon}>
        <Image source={require('../assets/img/ic_settings.png')} style={st.profileImgIcon}/>
      </View>

      <View style={st.shopperTitleProfile}>
        <Image source={{uri: 'https://unsplash.it/100/100?image=158'}} style={st.shopProfileImg}/>
        <Text style={ st.shopProfileName } >William Reid</Text>
      </View>

      <View style={st.shopperTitleIcon}>
        <Image source={require('../assets/img/ic_settings.png')} style={st.profileImgIcon}/>
      </View>

    </View>
  </View>
);

export default ProfileHeader;
