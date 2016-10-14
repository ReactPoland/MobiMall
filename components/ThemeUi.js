import React, { Component } from 'react';
import {
  View,
  UIManager,
  Text,
  DrawerLayoutAndroid
} from 'react-native';
import { COLOR, ThemeProvider, ActionButton } from 'react-native-material-ui';
// import { Drawer } from 'react-native-material-design';
import { Avatar, Drawer, Divider, COLOR as cc, TYPO } from 'react-native-material-design';



export default class ThemeUi extends Component {

  constructor(props) {
    super(props);

    this.state = {
      drawer: null,
      navigator: null
    };
    
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

  setDrawer(drawer) {
    this.setState({drawer});
  }

  render() {
    const { drawer, navigator } = this.state;
    const navView = React.createElement(Navigation);



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

          


           
            { this.props.children }
            <ActionButton 
              actions={ [ 'email', 'phone', 'sms', 'favorite' ] }
              transition='toolbar'
              onPress={(action) => { } }
               />
          </View>
        </ThemeProvider>

      </DrawerLayoutAndroid>

    )
  
  }
};


class Navigation extends Component {

  changeScene(path, name) {
      // const { drawer, navigator } = this.context;

      // this.setState({
          // route: path
      // });
      // navigator.to(path, name);
      // drawer.closeDrawer();
  }

  render() {
    
    const route = "welcome";


    return (

      <Drawer theme='light'>
          <Drawer.Header >
              <View style={styles.header}>
                  <Text style={[styles.text, cc.paperGrey50, TYPO.paperFontSubhead]}>React Native Material Design</Text>
              </View>
          </Drawer.Header>

          <Drawer.Section
              items={[{
                  icon: 'home',
                  value: 'Welcome',
                  active: !route || route === 'welcome',
                  onPress: () => this.changeScene('welcome'),
                  onLongPress: () => this.changeScene('welcome')
              }]}
          />

          <Drawer.Section
              title="Components"
              items={[{
                  icon: 'face',
                  value: 'Avatars',
                  label: '12',
                  active: route === 'avatars',
                  onPress: () => this.changeScene('avatars'),
                  onLongPress: () => this.changeScene('avatars')
              }, {
                  icon: 'label',
                  value: 'Buttons',
                  active: route === 'buttons',
                  label: '8',
                  onPress: () => this.changeScene('buttons'),
                  onLongPress: () => this.changeScene('buttons')
              }, {
                  icon: 'check-box',
                  value: 'Checkboxes',
                  label: '10',
                  active: route === 'checkboxes',
                  onPress: () => this.changeScene('checkboxes'),
                  onLongPress: () => this.changeScene('checkboxes')
              }, {
                  icon: 'label',
                  value: 'Dividers',
                  label: '10',
                  active: route === 'dividers',
                  onPress: () => this.changeScene('dividers'),
                  onLongPress: () => this.changeScene('dividers')
              }, {
                  icon: 'label',
                  value: 'Icon Toggles',
                  label: 'NEW',
                  active: route === 'icon-toggles',
                  onPress: () => this.changeScene('icon-toggles'),
                  onLongPress: () => this.changeScene('icon-toggles')
              }, {
                  icon: 'radio-button-checked',
                  value: 'Radio Buttons',
                  label: '8',
                  active: route === 'radio-buttons',
                  onPress: () => this.changeScene('radio-buttons'),
                  onLongPress: () => this.changeScene('radio-buttons')
              },
               //{
               //   icon: 'list',
               //   value: 'List',
               //   label: 'NEW',
               //   active: route === 'list',
               //   onPress: () => this.changeScene('list'),
               //   onLongPress: () => this.changeScene('list')
               //},
              {
                  icon: 'label',
                  value: 'Subheaders',
                  label: '4',
                  active: route === 'subheaders',
                  onPress: () => this.changeScene('subheaders'),
                  onLongPress: () => this.changeScene('subheaders')
              }]}
          />
          <Divider style={{ marginTop: 8 }} />
          <Drawer.Section
              title="Config"
              items={[{
                  icon: 'invert-colors',
                  value: 'Change Theme',
                  label: '24',
                  active: route === 'themes',
                  onPress: () => this.changeScene('themes'),
                  onLongPress: () => this.changeScene('themes')
              }]}
          />

      </Drawer>

    )
  }

}

const styles = {
    header: {
        paddingTop: 16
    },
    text: {
        marginTop: 20
    }
};