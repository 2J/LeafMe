import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import RadioForm from 'react-native-simple-radio-button';

import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../styles';

export default class ManualOrPreset extends Component {
  state = {
    selected: 'preset'
  }

  goToNext = () => {
    if(this.state.selected === 'preset') {
      this.props.navigation.navigate('PresetCategory');
    } else {
      this.props.navigation.navigate('ManualSetup');
    }
  }

  render() {
    const radio_props = [
      { 
        label: 'Choose from preset plants and recommended watering + lighting schedules (recommended for first-time gardeners)', 
        value: 'preset' 
      },
      { 
        label: 'Set up my own watering and lighting schedules (recommended for seasoned gardeners)', 
        value: 'manual'
      }
    ];

    return (
      <View style={CONTAINERS.login}>
        
        <Text 
          style={FONTS.smallerWhiteText}
          >How would you like to set up your plant? 
        </Text>

        <View>
          <RadioForm
            radio_props={radio_props}
            initial={0}
            buttonColor={COLORS.white}
            selectedButtonColor={COLORS.white}
            labelColor={COLORS.grey9}
            labelStyle={{
              fontSize: 18,
              marginBottom: 15,
              width: '91%'
            }}
            style={{
              paddingLeft: 15
            }}
            onPress={(value) => {this.setState({selected: value})}}
          />
        </View>
        
        
        <View style={{alignItems: 'center'}}>
          <Button 
            mode='outlined'
            color={COLORS.green5}
            onPress={this.goToNext}
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