import React, { Component } from 'react';
import {
  View,
  UIManager
} from 'react-native';
import { COLOR, ThemeProvider, ActionButton } from 'react-native-material-ui';



export default class ThemeUi extends Component {

  constructor(props) {
    super(props);
    
    this.uiTheme = {
        palette: {
            primaryColor: COLOR.green500,
        },
        toolbar: {
            container: {
                height: 50,
            },
        },
    };

  }

  componentWillMount() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  render() {

    return (

      <ThemeProvider uiTheme={ this.uiTheme } >
        <View style={ { flex: 1 } }>
          { this.props.children }
          <ActionButton 
            actions={ [ 'email', 'phone', 'sms', 'favorite' ] }
            transition='toolbar'
            onPress={(action) => { } }
             />
        </View>
      </ThemeProvider>
    )
  
  }
};