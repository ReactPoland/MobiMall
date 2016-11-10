import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  TextInput
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import { Card } from 'react-native-material-design';

import PurpleButton from '../../components/PurpleButton';
import st from '../../assets/style';

const StoreTab = ({ storeItem, onLogin, onLogout }) => {

  let storeCardBody;

  if ( storeItem ) {
    storeCardBody = (
      <View>

        <Text style={st.textInput2} >Company Name</Text>

        <View>
          <Text style={[st.textInputGrey, {paddingTop: 5, paddingBottom: 9}]} >{storeItem.companyName}</Text>
        </View>
              
        {/*<TextInput
          label={'Company Name'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.textInputGrey}
          autoCapitalize={'none'}
          editable={false}
          autoCorrect={false}
          value={storeItem.companyName}
        />*/}

        <Text style={st.textInput2} >Instagram Handle</Text>

        <View>
          <Text style={[st.textInputGrey, {paddingTop: 5, paddingBottom: 9}]} >{storeItem.igHandle}</Text>
        </View>

        {/*<TextInput
          label={'Instagram Handle'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.textInputGrey}
          autoCapitalize={'none'}
          editable={false}
          autoCorrect={false}
          value={storeItem.igHandle}
        />*/}  

        <Text style={st.textInput2} >Description</Text>
        
        <View>
          <Text style={[st.textInputGrey, {paddingTop: 5, paddingBottom: 9}]} >{storeItem.description}</Text>
        </View>
        {/*<TextInput
          label={'Description'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.textInputGrey}
          autoCapitalize={'none'}
          editable={false}
          autoCorrect={false}
          value={storeItem.description}
        />*/}

        <Text style={st.textInput2} >Website</Text>

        <View>
          <Text style={[st.textInputGrey, {paddingTop: 5, paddingBottom: 9}]} >{storeItem.website}</Text>
        </View>
        {/*<TextInput
          label={'Website'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.textInputGrey}
          autoCapitalize={'none'}
          editable={false}
          autoCorrect={false}
          value={storeItem.website}
        />*/}

        <PurpleButton text={'LOGOUT'} onPress={onLogout} />

      </View>
    );

  } else {
    storeCardBody = (
      <View>
        <Text style={{color: 'purple', padding: 10 }}>Login with Instagram to link and retrieve you Instagram shop details</Text>
        <TouchableNativeFeedback onPress={onLogin}>
          <View style={{borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20, alignItems: 'center' }} >
            <Image 
              style={{
                width: 197,
                height: 31,
              }} 
              source={require('../../assets/img/ig_sign-in.png')} />
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }




  return (
    <Card>
      <Card.Body>
        { storeCardBody }
      </Card.Body>
    </Card>
  ) 

};

export default StoreTab;
