import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  Image
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
        
        <Sae
          label={'Company Name'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.textInputGrey}
          autoCapitalize={'none'}
          editable={false}
          autoCorrect={false}
          value={storeItem.companyName}
        />

        <Sae
          label={'Instagram Handle'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.textInputGrey}
          autoCapitalize={'none'}
          editable={false}
          autoCorrect={false}
          value={storeItem.igHandle}
        />  

        <Sae
          label={'Description'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.textInputGrey}
          autoCapitalize={'none'}
          editable={false}
          autoCorrect={false}
          value={storeItem.description}
        />

        <Sae
          label={'Website'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'gray'}
          inputStyle={st.textInputGrey}
          autoCapitalize={'none'}
          editable={false}
          autoCorrect={false}
          value={storeItem.website}
        />

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
