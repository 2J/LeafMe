import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import _ from 'lodash';

import { COLORS, FONTS } from '../../styles';

export default class Species extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onSelect(this.props.id)}
        style={[
          {
            backgroundColor: COLORS.green1,
            padding: 20, 
            borderBottomWidth: 2,
            borderBottomColor: COLORS.grey3
          },
          { 
            backgroundColor: this.props.id == this.props.selected ? COLORS.green1 : COLORS.grey1 
          },
        ]}
      >
        <Text style={FONTS.h4}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}