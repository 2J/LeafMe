import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import _ from 'lodash';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import { COLORS } from '../../styles';

export default class Category extends Component {
  render() {
    return (
      <View 
        style={{
          width: '50%',
          flexDirection: 'column', 
          alignItems: 'center'
        }}
      >
        <AwesomeIcon 
          name={this.props.icon} 
          size={70} 
          color={this.props.color ? COLORS.white : COLORS.green3} 
          onPress={this.props.press}
        />
        <Text>{this.props.name}</Text>
      </View>
    )
  }
}