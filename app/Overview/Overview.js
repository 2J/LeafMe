import React, { Component } from 'react';
import _ from 'lodash';
import { Button, Card } from 'react-native-paper';
import { Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//Model Imports
import Sensors from '../Models/Sensors';
import Plant from '../Models/Plant';

//Component Imports
import InfoCard from './InfoCard';
import CustomBanner from '../Components/CustomBanner';

//Style Imports
import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../styles';

export default class Overview extends Component {
  state = {
    moisture: '',
    brightness: '',
    temperature: '',
    humidity: '', 
    tankLevel: '',
    plantName: ''
  }

  refreshSensors = async () => {
    console.log('REFRESHING SENSORS');
    const moisture = {
      1: 'Very Dry', 
      2: 'Dry', 
      3: 'Wet',
      4: 'Very Wet'
    }

    const brightness = {
      1: 'Very Dark', 
      2: 'Dark', 
      3: 'Bright',
      4: 'Very Bright'
    }

    let sensors = await Sensors.getSensors().then( data => {
      //TODO: change these to ranges to display words
      this.setState({ 
        moisture: moisture[data.soil_moisture.value],
        brightness: brightness[data.brightness.value],
        temperature: data.ambient_temperature.value + 'C',
        humidity: data.ambient_humidity.value + '%',
        tankLevel: data.tank_level.value
      });
    });
  }

  async componentDidMount(){
    await Plant.getPlant().then(data => {
      this.setState({
        plantName: data.name
      })
    })
    .catch((error) => {
      Alert.alert(
        'Error getting Plant Name: ' + error
      );
      throw error;
    });
    await this.refreshSensors();
  }

  render() {
    const {
      moisture,
      brightness,
      temperature,
      humidity,
      tankLevel, 
      plantName
    } = this.state;

    return (
        <ScrollView>
          <CustomBanner 
            parent='Overview'
            emoji='sunny'
          />
            
          <View style={CONTAINERS.main}>
            <Text style={FONTS.h1}>Currently Growing: {plantName}</Text>
            <View style={CONTAINERS.spaceBetween}>
              <Text style={FONTS.h4}>Plant Conditions</Text>
              <Button 
                mode='contained'
                color={COLORS.green5}
                onPress={this.refreshSensors}
                style={{marginBottom: 10}}
              >Refresh Stats</Button>
            </View>
            
            
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

            <View style={{paddingTop: 20}}></View> 
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

            <View style={{paddingTop: 20}}></View> 
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
                  <View style={{flexDirection: 'column', textAlign: 'center', width: 225, padding: 5}}>
                    <Text style={FONTS.h1}>{tankLevel == 1 ? 'Good' : 'Needs Refill'}</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>

          </View>

        </ScrollView>
    );
  }
}