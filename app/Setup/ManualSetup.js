import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button} from 'react-native-paper';

import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../styles';

export default class ManualSetup extends Component {
  state = {
    selected: ''
  }

  goToNetworkSettings = () => { 
    this.props.navigation.navigate('NetworkSettings');
  }

  render() {
    return (
      <View style={CONTAINERS.main}>
        <Text 
          style={{
            fontSize: 32, 
            color: COLORS.grey9, 
            fontWeight: 'bold', 
            paddingBottom: 30}}
          >Manual Setup
        </Text>
        
        
        
        <View style={{alignItems: 'center'}}>
          <Button 
            mode='text'
            color={COLORS.white}
            onPress={() => this.props.navigation.goBack()}
          >Back</Button>
          <Button 
            mode='outlined'
            color={COLORS.green5}
            onPress={this.goToNetworkSettings}
            contentStyle={{
              width: 100, 
              backgroundColor: COLORS.white
            }}
          >Next</Button>
        </View>

       </View>
    )
  }
}