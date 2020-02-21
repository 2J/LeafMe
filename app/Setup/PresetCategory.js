import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import _ from 'lodash';

import Category from './Components/Category';
import BackAndNext from './Components/BackAndNext';
import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../styles';

export default class PresetCategory extends Component {
  state = {
    PEPPER: false,
    ROOT_VEG: false, 
    FRUIT_VEG: false, 
    HERB: false, 
    LEGUME: false,
    selected: ''
  }

  goToNetworkSettings = () => { 
    this.props.navigation.navigate('NetworkSettings');
  }

  selectType = (type) => {
    _.forIn(this.state, stateVar => {
      if(stateVar === type) {
        this.setState({
          [type] : true
        });
      } else {
        this.setState({
          [stateVar] : false
        });
      }
    });

    this.setState({
      selected: type
    })
  }

  render() {
    return (
      <View style={CONTAINERS.login}>
        
        <Text 
          style={FONTS.smallerWhiteText}
          >What type of plant are you growing?  
        </Text>

        <View style={{
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-evenly'
        }}>          
          <Category 
            icon='pepper-hot' 
            name='Peppers'
            color={this.state.PEPPER} 
            press={() => this.selectType('PEPPER')}
          />

          <Category 
            icon='carrot' 
            name='Root Vegetables'
            color={this.state.ROOT_VEG} 
            press={() => this.selectType('ROOT_VEG')}
          />
        </View>

        <View style={{
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between'
        }}>
          
          <Category 
            icon='apple-alt' 
            name='Fruits and Vegetables'
            color={this.state.FRUIT_VEG} 
            press={() => this.selectType('FRUIT_VEG')}
          />

          <Category 
            icon='leaf' 
            name='Herbs'
            color={this.state.HERB} 
            press={() => this.selectType('HERB')}
          />

        </View>

        <View style={{
          paddingBottom: 30,
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between'
        }}>
          <Category 
            icon='seedling' 
            name='Legumes'
            color={this.state.LEGUME} 
            press={() => this.selectType('LEGUME')}
          />
        </View> 

        <BackAndNext 
          goBack={() => this.props.navigation.goBack()}
          next={() => this.props.navigation.navigate('PresetSpecies', { selected: this.state.selected })}
        />       
       </View>
    )
  }
}