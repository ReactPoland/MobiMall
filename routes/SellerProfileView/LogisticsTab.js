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
    this.setState({ loading: true });
    if(this.state.addressToEdit) {
      const { addressToEdit, addressToEditIndex, addresses } = this.state;
      addresses[addressToEditIndex] = addressToEdit;
      api
        .saveAddresses(this.props.fbId, addresses)
        .then(() => this.setState({ addressToEdit: null, loading: false }));
    } else {
      const { newAddress, addresses } = this.state;
      addresses.push(newAddress);
      api
        .saveAddresses(this.props.fbId, addresses)
        .then(() => this.setState({ newAddress: {}, addresses, loading: false }));
    }
  }

  _onDelete (index) {
    this.setState({ loading: true });
    const { addresses } = this.state;
    addresses.splice(index, 1);
    api
      .saveAddresses(this.props.fbId, addresses)
      .then(() => this.setState({ addresses, loading: false }));
  }

  render () {
    return (
      <View style={st.profileTabView} >
        <AddressBox
          addresses={this.state.addresses}
          onPress={this._setAddressToEdit}
          onDelete={this._onDelete}
          mode='LogisticsTab'
          loading={this.state.loading}
        />
        <AddressInput
          addressToEdit={this.state.addressToEdit || this.state.newAddress}
          onChange={this._onChange}
          onSave={this._onSave}
          shouldDisplay={(this.state.addresses.length < 2 || this.state.addressToEdit)}
          isNew={!this.state.addressToEdit}
        />
      </View>
    );
  }
}
