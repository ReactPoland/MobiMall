/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Stripe from 'react-native-stripe-api';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

//83guDkuHKD8Arfny

//routing number: 254074170

class AwesomeProject extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    
    let stripe = new Stripe('sk_test_wpJjckCqdvlsL4p3YNkJlJDi');
    
    // scripe.createToken('4242424242424242', 12, 2017, 123 ).then(function(resp) {
      // if (resp.error) throw new Error(resp.error.message);

      // let token = resp.id;

      // scripe.createCustomer(token, "hhgffd@lackmail.ru" ).then(function(resp) {
        // console.log(resp);
      // });
    // });

    stripe.getCustomer('cus_9BIrPE73rQJG67').then(function(resp) {
      console.log(resp);
    })

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native! {'\n'}
          I am a developer!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
