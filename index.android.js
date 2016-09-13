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
    this._pressCartButton = this._pressCartButton.bind(this);
    this.makeCharge = this.makeCharge.bind(this);

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
        newState.stripeCustomerData = resp;
      }
      
      that.setState( newState );
      
    });

  }

  _pressCartButton(val) {
    this.makeCharge(val);
  }

  makeCharge(val) {
    console.log('make charge', val);
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

        (
          <View style={{flex: 1, backgroundColor: '#ff4563', borderRadius: 20, width: 300 }}>
            <TouchableNativeFeedback onPress={this._onPressButton} >
              <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize:20}}>
                  Show data from stripe
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        )
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

        <View style={{flex:10, alignSelf: 'stretch'}}>

          <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{
              fontSize: 20,
              flex:10
            }} >
              Product 1 -> 5.60$
            </Text>
            <TouchableNativeFeedback onPress={ () => this._pressCartButton(560) }>
              <View style={{
                flex:1, 
                width: 100, 
                height: 50, 
                backgroundColor: 'purple', 
                borderRadius: 10, 
                justifyContent: 'center', 
                alignItems: 'center'
              }} >
                <Text style={{textAlign:'center', fontSize:20}}>BUY</Text>
              </View>
            </TouchableNativeFeedback>

          </View>

          <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{
              fontSize: 20,
              flex:10,
            }}>
              Product 2 -> 8.00$
            </Text>
            <TouchableNativeFeedback onPress={ () => this._pressCartButton(800) }>
              <View style={{
                flex:1, 
                width: 100,
                height: 50,
                backgroundColor: 'purple',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{fontSize:20}}>BUY</Text>
              </View>
            </TouchableNativeFeedback>
          </View>

          <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{
              fontSize: 20,
              flex:10
            } }>
              Product 3 -> 10.00$
            </Text>
            <TouchableNativeFeedback onPress={ () => this._pressCartButton(1000) }>
               <View style={{
                flex:1, 
                width: 100, 
                height: 50, 
                backgroundColor: 'purple', 
                borderRadius: 10,  
                justifyContent: 'center', 
                alignItems: 'center'
              }}>
                <Text style={{fontSize:20}}>BUY</Text>
              </View>
            </TouchableNativeFeedback>
          </View>

          <StripeProfileData data={ this.state.stripeCustomerData }  />

          <View style={{flex:3}} >

            <Text style={styles.welcome}>
              
            </Text>

          </View>

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
