import React, {Component} from 'react';
import _ from 'lodash';
import { Text, View, ScrollView } from 'react-native';
import { Banner } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

//Component Imports
import InfoCard from './InfoCard';

//Style Imports
import { COLORS, CONTAINERS, FONTS } from '../styles';

export default class Overview extends Component {
  state = {
    visible: true,
    username: "Captain America"
  };
  render() {
    return (
      <View>
        <ScrollView>
          <Banner 
            visible={this.state.visible}
            actions={[]} //required attribute, but we don't have any buttons in this banner
              style={{
                backgroundColor: COLORS.green5, 
                padding: 5
              }}
            icon={({ size }) =>
              <Icon name='ios-sunny' size={80} color={COLORS.yellow} />
            }
          >
            <Text style={FONTS.banner}>Good Morning, </Text>
            <Text style={FONTS.banner}>{this.state.username}.</Text>
          </Banner>

          <View style={CONTAINERS.main}>
            <Text style={FONTS.h1}>Your plant is great :) </Text>

            <Text style={FONTS.h4}>Plant Conditions </Text>
            
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20}}>
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
            
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20}}>
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
      </View>
    );
  }
}