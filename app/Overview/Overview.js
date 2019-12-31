import React, { Component } from 'react';
import _ from 'lodash';
import { Text, View, ScrollView } from 'react-native';

//Component Imports
import InfoCard from './InfoCard';
import CustomBanner from '../Components/CustomBanner';

//Style Imports
import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../styles';

export default class Overview extends Component {
  render() {
    return (
        <ScrollView>
          <CustomBanner 
            parent='Overview'
            emoji='sunny'
          />
            
          <View style={CONTAINERS.main}>
            <Text style={FONTS.h1}>Your plant is great :) </Text>

            <Text style={FONTS.h4}>Plant Conditions </Text>
            
            <View style={_.assignIn(CONTAINERS.spaceBetween, {paddingBottom: 20})}>
              <InfoCard 
                title='Soil Moisture'
                iconName='ios-water'
                status='Wet'
              />
              <InfoCard 
                title='Brightness'
                iconName='lightbulb-o'
                status='High'
              />
            </View> 

            <Text style={FONTS.h4}>Ambient Conditions </Text>
            
            <View style={_.assignIn(CONTAINERS.spaceBetween, {paddingBottom: 20})}>
              <InfoCard 
                title='Temperature'
                iconName='thermometer-3'
                status='73F'
              />
              <InfoCard 
                title='Humidity'
                iconName='md-cloud'
                status='50%'
              />
            </View>
          </View>

        </ScrollView>
    );
  }
}