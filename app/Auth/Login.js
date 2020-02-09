import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';

import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../styles';

export default class Overview extends Component {
  goToApp = () => {
    this.props.navigation.navigate('App');
  }

  render() {
    return (
      <View style={{backgroundColor: COLORS.green5}}>
        <Text>Login Screen!</Text>
        <Button 
          mode='contained'
          color={COLORS.green5}
          onPress={this.goToApp}
        >Go to Home</Button>
      </View>
    )
  }
}