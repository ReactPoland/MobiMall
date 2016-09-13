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
  View,
  TextInput,
  TouchableNativeFeedback,
  Alert,
} from 'react-native';

//83guDkuHKD8Arfny

//routing number: 254074170

// cards id
// 5105105105105100
// 4111111111111111
// 4012888888881881

// paymants 



class StripeProfileData extends Component {

  constructor( props ) {
    super( props );
  }

  render() {
    let { data:profileData } = this.props;

    let CardView = ({cardData}) => {
      return (
        <Text style={styles.instructions}>
        Card - {cardData.brand} - {cardData.country} {'\n'}
        Number: ...{cardData.last4}. Month: {cardData.exp_month} Year: {cardData.exp_year} {'\n'}
        </Text>
      )
    };


    if (!profileData)
      return null;

    return (
      <View style={{flex: 1}}>
          <Text style={styles.welcome}>Email: {profileData.email}</Text>
          <Text style={styles.instructions}>Balance: {profileData.account_balance}</Text>
          <Text style={styles.welcome}>Cards: </Text>

          {
            profileData.sources && profileData.sources.data && profileData.sources && profileData.sources.data.length ?
            profileData.sources.data.map((item, index) => (<CardView key={index} cardData={item} />) ) :
            <Text style={styles.instructions}> empty </Text>
          }




      </View>
    )
  }
}



class AwesomeProject extends Component {

  constructor(props) {
    super(props);

    this._onPressButton = this._onPressButton.bind(this);

    // this.const = {
      // STRIPE_USER_DATA_LOADED : 'STRIPE_USER_DATA_LOADED',
      // STRIPE_USER_DATA_LOADING : 'STRIPE_USER_DATA_LOADING',
      // STRIPE_USER_DATA_NOT_LOADED : 'STRIPE_USER_DATA_NOT_LOADED',
    // };

    this.state= {
      text:"",
      costumerId: 'cus_9BIrPE73rQJG67',
      // stripeCustomerDataStatus: this.const.STRIPE_USER_DATA_NOT_LOADED,
      stripeCustomerDataLoading: false,
      stripeCustomerData: null,
      data: {
        name: 'Bob',
        lastName: 'Simpson',
        email: 'bob.simpson@mail.com',
        number: '172737475767',
        about: 'This is fish text and it tells about me',
      }
    };

    this.stripe = new Stripe('sk_test_wpJjckCqdvlsL4p3YNkJlJDi');
  }

  _onPressButton() {

    if ( this.state.stripeCustomerDataLoading || (this.state.stripeCustomerData !== null) ) {
      Alert.alert( "Data is loading or was loaded" );
      return;
    };

    this.setState({stripeCustomerDataLoading: true});
    let that = this;

    this.stripe.getCustomer( this.state.costumerId ).then(function(resp) {

      let newState = {
        stripeCustomerDataLoading: false,  
      }
      
      if (resp.error) 
        Alert.alert( resp.error.message );
      else {
        console.log(resp);
        newState.stripeCustomerData = resp;
      }
      
      that.setState( newState );
      
    });

  }

  render() {

    // stripe.stripePostRequest('charges', {
      // amount: 100,
      // currency: 'usd',
      // description: 'this is test charge',
      // customer: 'cus_9BIrPE73rQJG67',

    // }).then(function(resp) {
      // console.log(resp);
    // })


    // stripe.createToken('4012888888881881', 12, 2019, 333 ).then(function(resp) {
      // if (resp.error) throw new Error(resp.error.message);
      // let token = resp.id;

      // stripe.addCardToCustomer(token, "cus_9BIrPE73rQJG67" ).then(function(resp) {
        // console.log(resp);
      // });      

    // });


    
    // stripe.createToken('4242424242424242', 12, 2017, 123 ).then(function(resp) {
      // if (resp.error) throw new Error(resp.error.message);

      // let token = resp.id;

      // stripe.createCustomer(token, "hhgffd@lackmail.ru" ).then(function(resp) {
        // console.log(resp);
      // });
    // });

    // stripe.getCustomer('cus_9BIrPE73rQJG67').then(function(resp) {
      // console.log(resp);
    // })

    return (
      <View style={styles.container}>

      { (!this.state.stripeCustomerDataLoading) && ( this.state.stripeCustomerData === null) ?  

        <TouchableNativeFeedback onPress={this._onPressButton}>
         <View style={{width: 150, height: 100, backgroundColor: 'red', borderRadius: 5}}>
          <Text style={{fontSize:20}}>
            Welcome to React Native!
          </Text>
          </View>
        </TouchableNativeFeedback>
        : null
      }



        {/*<View style={{flex:1, flexDirection: 'row', marginLeft: 30, marginRight: 30, minHeight: 40, justifyContent: 'center', alignItems: 'center'}}>
    
          <Text style={{flex: 1, minWidth: 110}}>
            Enter you email:
          </Text>
    
          <TextInput
              style={{backgroundColor: "yellow", flex:3 }}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
        </View>
      */}

        <View style={{flex:10}}>


          <Text style={styles.welcome}>
            Welcome to React Native! {'\n'}
            I am a developer!
          </Text>

          <StripeProfileData data={ this.state.stripeCustomerData }  />

        </View>


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
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
