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
      loading: true
    };
  }

  componentDidMount () {
    api
      .getAddresses(this.props.fbId)
      .then(({ data }) => this.setState({ addresses: data, loading: false }))
      .catch(e => console.log('e', e));
  }

  _setAddressToEdit (index) {
    console.log('here');
    this.setState({
      addressToEdit: this.state.addresses[index],
      addressToEditIndex: index
    });
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
      </View>
    );
  }
}
