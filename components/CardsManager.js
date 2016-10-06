import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback
} from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";
import { Button } from 'react-native-material-design';

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
    this.setState({ saving: true });
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
      <View>
        <View style={st.contentWrap}>
          <Text style={st.blockSubtitle} >MY CARDS</Text>
          {this._getCards()}
        </View>

        <View style={st.contentWrap} >
          <Text style={st.blockSubtitle} >NEW PAYMENT DETAILS</Text>
          <CreditCardInput onChange={this._onCardInputChange} />
          <Button text={saving ? 'SAVING...' : 'SAVE CARD'} raised={true} overrides={{
            backgroundColor: '#9100be',
            textColor: '#ffffff'
          }}
          />
        </View>
      </View>
    );
  }
}
