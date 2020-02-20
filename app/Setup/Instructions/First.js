import React, { Component } from 'react';
import { Alert, Image, Text, View, ScrollView } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';

import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../../styles';

export default class First extends Component {
  render() {
    return (
      <View style={CONTAINERS.login}>
        <View style={{
          top: '10%' 
        }}>
          <Text style={FONTS.login}>Now let's set up your device.</Text>
        </View>
        
        <View style={{
          height: 40,
          width: '100%',
          top: '45%',
          flexDirection: 'row', 
          alignItems: 'right'
        }}>
          <Button 
            mode='text'
            color={COLORS.grey9}
            onPress={this.props.goBack}
          >Back</Button>
        </View>
      </View>
    );
  }
}