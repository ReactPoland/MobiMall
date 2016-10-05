import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';

import st from '../../assets/style';
import { bindMethods, api } from '../../utils';
import AddressBox from '../../components/AddressBox';
import AddressInput from '../../components/AddressInput';

export default class LogisticsTab extends Component {
  constructor() {
    super();
    bindMethods(this);
    this.state = {
      addresses: [],
      addressToEdit: null,
      addressToEditIndex: false,
      newAddress: {}
    };
  }

  componentDidMount () {
    this.setState({ loading: true });
    api
      .getAddresses(this.props.fbId)
      .then(({ data }) => this.setState({ addresses: data, loading: false }))
      .catch(e => console.log('e', e));
  }

  _setAddressToEdit (index) {
    this.setState({
      addressToEdit: this.state.addresses[index],
      addressToEditIndex: index
    });
  }

  _onChange (prop, val) {
    if(this.state.addressToEdit) {
      const { addressToEdit } = this.state;
      addressToEdit[prop] = val;
      this.setState({ addressToEdit });
    } else {
      const { newAddress } = this.state;
      newAddress[prop] = val;
      this.setState({ newAddress });
    }
  }

  _onSave () {
    console.log('asd');
  }

  render () {
    return (
      <View>
        <AddressBox
          addresses={this.state.addresses}
          onPress={this._setAddressToEdit}
          mode='LogisticsTab'
          loading={this.state.loading}
        />
        <AddressInput
          addressToEdit={this.state.addressToEdit || this.state.newAddress}
          onChange={this._onChange}
          onSave={this._onSave}
        />
      </View>
    );
  }
}
