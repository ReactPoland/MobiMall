import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback
} from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";

import { bindMethods, api } from '../utils';
import st from '../assets/style';

import CardRow from './CardRow';


export default class CardsManager extends Component {
  constructor (props) {
    super(props);
    bindMethods(this);
    this.state = {
      fetchingData: false,
      cards: [],
      cardData: null
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
		this.setState({ fetchingData: false, cards });
	}

  _getCards () {
    const { cards, fetchingData } = this.state;
		if(fetchingData) return <Text>Loading data...</Text>;
		if(cards.length < 1) return <Text>No cards added yet</Text>;
		return cards.map((card, i) => (
			<CardRow cardData={card} key={i} />
		));
  }

  _onCardInputChange (card) {
		if(card.valid) {
			const { number, expiry, cvc } = card.values;
			const cardNumber = number.split(' ').join('');
			const expMonth = expiry.split('/')[0];
			const expYear = expiry.split('/')[1];
			const cardData = {
				cardNumber,
				expMonth,
				expYear,
				cvc
			}
			this.setState({ cardData });
		}
	}

  async _onCardSave() {
		const { cardData } = this.state;
    const { fbId } = this.props;
		const { cardNumber, expMonth, expYear, cvc } = cardData;
		if(cardData) {
			const cardToken = await Stripe
				.createToken(cardNumber, expMonth, expYear, cvc);
			if(cardToken.id) {
				const apiResp = await api.saveCard(fbId, cardToken.id);
				if(!apiResp.data.error) {
					this._fetchData();
				}
			}
		}
	}

  render () {
    return (
      <View>
        <View style={st.contentWrap}>
          <Text style={st.blockSubtitle} >MY CARDS</Text>
          {this._getCards()}
        </View>

        <View style={st.contentWrap} >
          <Text style={st.blockSubtitle} >NEW PAYMENT DETAILS</Text>
          <CreditCardInput onChange={this._onCardInputChange} />
          <TouchableNativeFeedback
            onPress={this._onCardSave} >
            <View style={st.purpleButtonView} >
              <Text style={st.purpleButtonName} >SAVE CARD</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}
