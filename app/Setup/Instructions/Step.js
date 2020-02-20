import React, { Component } from 'react';
import { Alert, Image, Text, View, ScrollView } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';

import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../../styles';

export default class Step extends Component {
  render() {
    return (
      <View style={CONTAINERS.step}>
        <Text>{this.props.instruction}</Text>
        <Image 
          style={{width: '100%'}}
          source={this.props.image} />
      </View>
    );
  }
}