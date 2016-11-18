import React, { Component } from 'react';
import {
  View,
  UIManager,
  Text,
  DrawerLayoutAndroid,
  Alert,
  AsyncStorage,
  Image
} from 'react-native';
import { COLOR, ThemeProvider, ActionButton, Toolbar } from 'react-native-material-ui';
// import { Drawer } from 'react-native-material-design';
import { Avatar, Drawer, Divider, COLOR as cc, TYPO } from 'react-native-material-design';
import SideMenu from '../routes/SideMenu'
import { bindMethods, api } from '../utils'
import { createIconSet } from 'react-native-vector-icons';
import routes from '../routes/routes'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class ThemeUi extends Component {

  constructor(props) {
    super(props);

    this.state = {
      drawer: null,
      navigator: null,
      showBasket: false,
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

    // icomoon 1

    // this.iconsMap = {
    //   wallet    :59651,
    //   news      :59652,
    //   coupon    :59653,
    //   backarrow :59671,
    //   search    :59672,
    //   heart     :59673,
    //   orders    :59674,
    //   dashboard :59675,
    //   home      :59648,
    //   cart      :59676,
    //   store     :59677,
    //   order     :59679
    // };

    // 59638 - 59728

    this.iconsMap = {
      home    :59701,
      plus2   :59700,
      orders  :59674,
      user    :59705,
      setting :59649,
      heart   :59673,
      search  :59672,
    }

    this.isExsistRouteInStack = (route) => {
      return this.props.navigator.getCurrentRoutes().some(item => item.key === route.key );
    }

    this.Icon = createIconSet(this.iconsMap, 'icomoon' );

  }

  renderIcon(source, isActive) {

    let iconView;
    const Icon = this.Icon;
    let style = {},
        fontSize = 30;
    if (isActive) {
      fontSize = 35;
      style = {
        color: 'purple',
      }
    }

    switch( source.type ) {
      case 'awesome' : 
        iconView = ( <AwesomeIcon style={style} size={ fontSize } name={source.name} /> );
      break;
      case 'text':
        iconView = ( <Text style={[{fontSize: fontSize}, style]}>{source.name}</Text> );
      break;
      default:
        iconView = (<Icon style={style} size={fontSize} name={source.name} />);
      break;
    }
    return iconView;
  }

  // renderIcons() {
  //   for (var i = 59638; i < 59690; i++) {

  //     Things[i]
  //   }
  // }



  componentWillMount() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  setDrawer(drawer) {
    this.setState({drawer});
  }

  backClickHandler() {
    this.props.navigator.pop();
  };
 

  actionButtonClickHandler(route) {
    let nextRoute = routes[route];

    this.isExsistRouteInStack( nextRoute ) ? 
      this.props.navigator.popToRoute( nextRoute ) : this.props.navigator.push( nextRoute );

  }

  toCheckoutHandler() {
    if ( this.state.showBasket ) {

      this.isExsistRouteInStack(routes.checkout) ?
      this.props.navigator.popToRoute( routes.checkout ) : this.props.navigator.push( routes.checkout );

    }
  }

  changeBasketState( nextState ) {
    this.setState({ showBasket: nextState });
  }


  componentDidMount() {
    this.changeBasketState( this.props.manager.getTransAvail() );
    this.props.manager.setTransListeners( this.changeBasketState );

    this.stripLinks =  this.props.route.stripLinks;  
  }

  componentWillUnmount() {
    this.props.manager.removeTransListeners( this.changeBasketState );
  }


  renderActionButton(links, navigator) {

    let stripLinks = [];

    if (links) {
      stripLinks = links;
    } else {
      navigator.getCurrentRoutes().map( ( route ) => {
        if ( route.stripLinks ) stripLinks = route.stripLinks;
      } );

      if ( ! stripLinks.length ) return null;
    }

    let actionIcons = stripLinks.map(item => ( { source: this.renderIcon(item.icon, this.props.route.key == item.route ), route: item.route  } ) );


    return (
      <ActionButton 
        mainIconElement={ (<View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}><Image source={require('../assets/img/mobimall-icon-button.png')} style={{width: 50, resizeMode: 'contain'}} /></View>) }
        actions={ actionIcons }
        transition='toolbar'
        onPress={ ( action ) => { if (action && action.route) this.actionButtonClickHandler( action.route ) } } />
    );

  }

  // SIDE MENU methods

  async logout() {
    await AsyncStorage.removeItem( 'logged-igId' );
    this.props.navigator.resetTo(routes.login);
  }

  async logoutFromAllAccounts() {
    await api.updatePersonalStore(this.props.manager.getDataFB().id, null );
    await this.logout();
  }

  async removeAccount() {
    await api.removeUser(this.props.manager.getDataFB().id);
    await AsyncStorage.removeItem( 'logged-igId' );
    this.props.navigator.resetTo(routes.login);
  }

  render() {


    const emptyFunc = () => { };
    const { drawer, navigator } = this.state;
    const navView = React.createElement(SideMenu, { 
      logoutFromAllAccounts: this.logoutFromAllAccounts,
      navigator: this.props.navigator,
      manager: this.props.manager, 
      logoutHandler: () => { this.logout() }, 
      removeAccountHandler: () => { this.removeAccount() } } );


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
              onRightElementPress={this.toCheckoutHandler}
              centerElement={this.props.route.title ? this.props.route.title.toUpperCase() : "None" }
              rightElement="shopping-basket"
              style={{
                container: {
                  backgroundColor: 'white',
                },
                leftElement: {
                  color:  this.props.navigator.getCurrentRoutes().length > 1 ? 'black': 'white',
                },
                titleText: {
                  color: 'purple',
                  textAlign: 'center',
                  paddingRight: 24,
                  fontWeight: '100',
                },
                rightElement: {
                  color: this.state.showBasket ? 'black' : 'white',
                }
              }}
            />

            { this.props.children }

            {this.renderActionButton(this.props.route.stripLinks, this.props.navigator) }

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