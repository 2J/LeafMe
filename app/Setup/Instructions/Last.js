import React, { Component } from 'react';
import { Alert, Image, Text, View, ScrollView } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';

import logo from '../../assets/icon.png';
import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../../styles';

export default class Last extends Component {
  render() {
    return (
      <View style={CONTAINERS.login}>
        <Image 
          style={{width: 100, height: 100, borderRadius: 25}}
          source={logo} />
        <Text style={FONTS.login}>All done, you're ready to start taking care of your plant :)</Text>
        <Button 
            mode='outlined'
            color={COLORS.green5}
            onPress={this.props.done}
            contentStyle={{
              width: 100, 
              backgroundColor: COLORS.white
            }}
          >Go!</Button>
      </View>
    );
  }
}