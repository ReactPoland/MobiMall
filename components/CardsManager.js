import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  Alert
} from 'react-native';
import { CreditCardInput } from "./react-native-credit-card-input";
import { Card, Subheader } from 'react-native-material-design';
import { Button } from 'react-native-material-ui';

import { bindMethods, api } from '../utils';
import st from '../assets/style';
import Stripe from '../stripe';

import CardRow from './CardRow';

export default class CardsManager extends Component {
  constructor (props) {
    super(props);
    bindMethods(this);
    this.state = {
      fetchingData: false,
      cards: [],
      cardData: null,
      saving: false
    };
  }

  componentDidMount () {
    this._fetchData();
  }

  async _fetchData () {
		this.setState({ fetchingData: true });
		const response = await api.getCards(this.props.fbId);
		if(response.data.error) return;
		const cards = response.data;
		this.setState({ fetchingData: false, cards, saving: false });
	}

  _getCards () {
    const { cards, fetchingData } = this.state;
		if(fetchingData) return <Text>Loading data...</Text>;
		if(cards.length < 1) return <Text>No cards added yet</Text>;
		return cards.map((card, i) => (
			<CardRow cardData={card} key={i} onDelete={this._onCardDelete} />
		));
  }

  _onCardInputChange (card) {
		if(card.valid) {
      console.log(card.values);
			const { number, expiry, cvc, name } = card.values;
			const cardNumber = number.split(' ').join('');
			const expMonth = expiry.split('/')[0];
			const expYear = expiry.split('/')[1];
			const cardData = {
				cardNumber,
				expMonth,
				expYear,
				cvc,
        name
			}
			this.setState({ cardData });
		} else{
      // Alert.alert('Cannot save the card, check the data and try again!');
    }
  }

  async _onCardSave() {
    const { cardData } = this.state;
    const { fbId } = this.props;
    if (!cardData) {
      Alert.alert('Error', 'Ivalid data');
      return;
    }
    const { cardNumber, expMonth, expYear, cvc, name } = cardData;
    if(cardData && cardNumber && expMonth && expYear && cvc && name) {
      this.setState({ saving: true });
      const cardToken = await Stripe
        .createToken(cardNumber, expMonth, expYear, cvc)
        .catch(() => {
          Alert.alert('Error', 'Cannot save the card, check the data and try again!') 
          this.setState({ saving: false });
        });
      if(cardToken && cardToken.id) {
        const apiResp = await api.saveCard(fbId, cardToken.id, name);
        if(!apiResp.data.error) {
          this._fetchData();
        }
      } else {
        this.setState({ saving: false });
        Alert.alert('Error', `Can't get token`);
      }
    } else {
      this.setState({ saving: false });
      Alert.alert('Error','Cannot save the card, check the data and try again!');
    }
	}

  _onCardDelete (id) {
    this.setState({ fetchingData: true });
    api
      .deleteCard(this.props.fbId, id)
      .then(() => this._fetchData())
      .catch(e => console.log('e:', e));
  }

  render () {
    const { saving } = this.state;
    return (
      <View style={this.props.style} >
        <Card>
          <Card.Body>
            <Text style={st.blockSubtitle} >MY CARDS</Text>
            {this._getCards()}
          </Card.Body>
        </Card>

        <Card >
          <Card.Body>
            <Text style={st.blockSubtitle} >NEW PAYMENT DETAILS</Text>
            <CreditCardInput 
              requiresName
              imageFront={ require('../assets/img/front-paycard.jpg') } 
              imageBack={ require('../assets/img/back-paycard.jpg') } 
              inputContainerStyle={{borderColor: '#ccc', borderBottomWidth: 1}} 
              onChange={this._onCardInputChange} />
            <Button 
              text={saving ? 'SAVING...' : 'SAVE CARD'}
              raised={true}
              style={{
                container: {
                  marginTop: 20, 
                  backgroundColor: '#9100be',
                },
                text: {
                  color: '#ffffff' 
                }
              }}
              onPress={this._onCardSave}
            />
          </Card.Body>
        </Card>
      </View>
    );
  }
}
