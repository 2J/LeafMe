import React, { Component } from 'react';
import { Alert, Image, Text, View, ScrollView } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';

import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../../styles';

export default class Last extends Component {
  render() {
    return (
      <View style={CONTAINERS.step}>
        <Text style={FONTS.login}>Now let's set up your device.</Text>
        <Button 
              mode='text'
              color={COLORS.grey1}
              onPress={this.props.done}
            >Go!</Button>
      </View>
    );
  }
}