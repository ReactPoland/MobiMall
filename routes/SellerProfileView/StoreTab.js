import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import { Card } from 'react-native-material-design';

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
          value={""}
        />

        <TouchableNativeFeedback onPress={onLogout}>
          <View style={{backgroundColor: '#aaa', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 5, marginVertical: 10 }} >
            <Text>logout</Text>
          </View>
        </TouchableNativeFeedback>

      </View>
    );

  } else {
    storeCardBody = (
      <TouchableNativeFeedback onPress={onLogin}>
        <View style={{backgroundColor: '#aaa', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 5 }} >
          <Text>Register your store</Text>
        </View>
      </TouchableNativeFeedback>
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
