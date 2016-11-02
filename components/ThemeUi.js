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
import { bindMethods, api } from '../utils'
import { createIconSet } from 'react-native-vector-icons';
import routes from '../routes/routes'


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

    this.isExsistRouteInStack = (route) => {
      return this.props.navigator.getCurrentRoutes().some(item => item.key === route.key );
    }

    this.Icon = createIconSet(this.iconsMap, 'icomoon' );

  }

  renderIcon(source) {
    const Icon = this.Icon;
    return <Icon size={40} name={source} />
  }



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

    let actionIcons = stripLinks.map(item => ( { source: this.renderIcon(item.iconName), route: item.route  } ) );


    return (
      <ActionButton 
        actions={ actionIcons }
        transition='toolbar'
        onPress={ ( action ) => { if (action && action.route) this.actionButtonClickHandler( action.route ) } } />
    );

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
              onRightElementPress={this.toCheckoutHandler}
              centerElement={this.props.route.title ? this.props.route.title.toUpperCase() : "None" }
              rightElement="shopping-basket"
              style={{
                container: {
                  backgroundColor: 'white',
                },
                leftElement: {
                  color:  this.props.navigator.getCurrentRoutes().length ? 'black': 'white',
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