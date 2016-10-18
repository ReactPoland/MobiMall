import React, { Component } from 'react';
import {
  View,
  UIManager,
  Text,
  DrawerLayoutAndroid,
  Alert
} from 'react-native';
import { COLOR, ThemeProvider, ActionButton, Toolbar } from 'react-native-material-ui';
// import { Drawer } from 'react-native-material-design';
import { Avatar, Drawer, Divider, COLOR as cc, TYPO } from 'react-native-material-design';
import Setting from '../routes/Setting'
import { bindMethods } from '../utils'
import { createIconSet } from 'react-native-vector-icons';


export default class ThemeUi extends Component {

  constructor(props) {
    super(props);

    this.state = {
      drawer: null,
      navigator: null
    };
    bindMethods(this);

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

    this.iconsMap = {
      wallet    :59651,
      news      :59652,
      coupon    :59653,
      backarrow :59671,
      search    :59672,
      heart     :59673,
      orders    :59674,
      dashboard :59675,
      home      :59648,
      cart      :59676,
      store     :59677,
      order     :59679
    };

    this.Icon = createIconSet(this.iconsMap, 'icomoon' );

  }

  renderIcon(source) {
    const Icon = this.Icon;
    return <Icon size={30} name={source} />
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

  actionButtonClickHandler(name) {

    switch( name ) {
      case "wallet" :
        this.props.navigator.toBuyerProfile();
        break;
      case "news" :
        this.props.navigator.toSellerProfile();
        break;
      case "heart" :
        this.props.navigator.toNewProductSeller();

        break;
      case "backarrow" :
        this.props.navigator.toBack();
        break;
    };

  }

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
              centerElement={this.props.route.title ? this.props.route.title.toUpperCase() : this.props.route.name.toUpperCase()}
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
                source: this.renderIcon('wallet'),
                name: 'wallet'
              }, {
                source: this.renderIcon('news'),
                name: 'news'
              }, {
                source: this.renderIcon('heart'),
                name: 'heart'
              }, {
                source: this.renderIcon('backarrow'),
                name: 'backarrow'
              }, {
                source: this.renderIcon('search'),
                name: 'search'
              } ] }
              transition='toolbar'
              onPress={ ( action ) => { if (action && action.name) this.actionButtonClickHandler(action.name) } } />
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