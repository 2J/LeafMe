import React, { Component } from 'react';
import _ from 'lodash';
import { Card } from 'react-native-paper';
import { Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//Model Imports
import Sensors from '../Models/Sensors';

//Component Imports
import InfoCard from './InfoCard';
import CustomBanner from '../Components/CustomBanner';

//Style Imports
import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../styles';

export default class Overview extends Component {
  state = {
    moisture: 'Wet',
    brightness: 'High',
    temperature: '73F',
    humidity: '50%'
  }

  refreshSensors = async () => {
    let sensors = await Sensors.getSensors().then( data => {
      console.log(data);
      // this.setState({
      //   wateringSchedule: data.watering_schedules, 
      //   lightingSchedule: data.lighting_schedules
      // });
    });
  }

  async componentDidMount(){
    await this.refreshSensors();
  }

  render() {
    const {
      moisture,
      brightness,
      temperature,
      humidity
    } = this.state;

    return (
        <ScrollView>
          <CustomBanner 
            parent='Overview'
            emoji='sunny'
          />
            
          <View style={CONTAINERS.main}>
            <Text style={FONTS.h1}>Your plant is great :) </Text>

            <Text style={FONTS.h4}>Plant Conditions</Text>
            
            <View style={_.assignIn(CONTAINERS.spaceBetween, {paddingBottom: 20})}>
              <InfoCard 
                title='Soil Moisture'
                iconName='ios-water'
                status={moisture}
              />
              <InfoCard 
                title='Brightness'
                iconName='lightbulb-o'
                status={brightness}
              />
            </View> 

            <Text style={FONTS.h4}>Ambient Conditions</Text>
            
            <View style={_.assignIn(CONTAINERS.spaceBetween, {paddingBottom: 20})}>
              <InfoCard 
                title='Temperature'
                iconName='thermometer-3'
                status={temperature}
              />
              <InfoCard 
                title='Humidity'
                iconName='md-cloud'
                status={humidity}
              />
            </View>

            <Text style={FONTS.h4}>Water Tank Level</Text>

            <Card style={CONTAINERS.wateringCard}>
              <Card.Content>
                <View style={{ 
                  flexDirection: 'row',
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: '5%'
                }}> 
                  <Icon name='ios-beaker' size={100} color={COLORS.green5}/>
                  <View style={{flexDirection: 'column', textAlign: 'center', width: 225}}>
                    <Text style={_.assignIn(FONTS.h1, {textAlign: 'center'})}>Good</Text>
                    <Text style={FONTS.h3}>Refill in approximately 10 days</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>

          </View>

        </ScrollView>
    );
  }
}