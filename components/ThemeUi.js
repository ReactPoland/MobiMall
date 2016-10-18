import React, { Component } from 'react';
import {
  View,
  UIManager,
  Text,
  DrawerLayoutAndroid
} from 'react-native';
import { COLOR, ThemeProvider, ActionButton, Toolbar } from 'react-native-material-ui';
// import { Drawer } from 'react-native-material-design';
import { Avatar, Drawer, Divider, COLOR as cc, TYPO } from 'react-native-material-design';
import Setting from '../routes/Setting'
import { bindMethods } from '../utils'


export default class ThemeUi extends Component {

  constructor(props) {
    super(props);

    this.state = {
      drawer: null,
      navigator: null
    };
    bindMethods(this);

    console.log(COLOR);
    
    this.uiTheme = {
        palette: {
            primaryColor: COLOR.green500,
            accentColor: COLOR.white,
        },
        toolbar: {
            container: {
                height: 50,
            },
        },
        actionButton: {
          icon: {
            color: 'black',
          }
        }
    };

  }



  componentWillMount() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  setDrawer(drawer) {
    this.setState({drawer});
  }

  backClickHandler() {
    if (this.props.route.index <= 0 ) return;
    this.props.navigator.toBack();
  };

  render() {

    const emptyFunc = () => { };
    const { drawer, navigator } = this.state;
    const navView = React.createElement(Setting);


    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left} 
        renderNavigationView={() => {
          if (drawer) {
              return navView;
          }
          return null;
        }} 
        ref={(drawer) => { !this.state.drawer ? this.setDrawer(drawer) : null }} >

        <ThemeProvider uiTheme={ this.uiTheme } >
          <View style={ { flex: 1 } }>
            <Toolbar 
              leftElement="arrow-back"
              onLeftElementPress={this.backClickHandler}
              centerElement={this.props.route.name.toUpperCase()}
              rightElement="arrow-back"
              style={{
                container: {
                  backgroundColor: 'white',
                },
                leftElement: {
                  color: this.props.route.index ? 'black' : 'white',
                },
                titleText: {
                  color: 'purple',
                  textAlign: 'center',
                  paddingRight: 24,
                  fontWeight: '100',
                },
                rightElement: {
                }
              }}
            />

          


           
            { this.props.children }
            <ActionButton 
              actions={ [ {
                source: { uri: "http://testmobimall2.herokuapp.com/homer-simpson.svg" },
              }, {
                source: { uri: "http://testmobimall2.herokuapp.com/homer-simpson.svg" },
              }, {
                source: { uri: "http://testmobimall2.herokuapp.com/homer-simpson.svg" },
              }, {
                source: { uri: "http://testmobimall2.herokuapp.com/homer-simpson.svg" },
              } ] }
              transition='toolbar'
              onPress={(action) => { } }
               />
          </View>
        </ThemeProvider>

      </DrawerLayoutAndroid>

    )
  
  }
};



const styles = {
    header: {
        paddingTop: 16
    },
    text: {
        marginTop: 20
    }
};