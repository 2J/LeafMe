import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import _ from 'lodash';
import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../../styles';

export default class BackAndNext extends Component {
  render() {
    return(
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <Button 
          mode='text'
          color={COLORS.grey9}
          onPress={this.props.goBack}
          style={{
            width: '50%',
            alignItems: 'left'
          }}
        >Back</Button>
        <Button 
          mode='outlined'
          color={COLORS.green5}
          onPress={this.props.next}
          contentStyle={{
            width: 100, 
            backgroundColor: COLORS.white
          }}
        >Next</Button>
      </View>
    )
  }
}