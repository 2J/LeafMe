import React, { Component } from 'react';
import { Alert, Text, View, ScrollView } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import _ from 'lodash';

//Model imports
import Presets from '../Models/Presets';
import Schedule from '../Models/Schedule';
import Plant from '../Models/Plant';

//Component Imports
import BackAndNext from './Components/BackAndNext';
import AddScheduleForm from '../GrowingSchedule/AddScheduleForm';

import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../styles';

export default class Preset extends Component {
  state = {
    wateringSchedule: [],
    lightingSchedule: [], 
    plant: '',
    newPlantName: ''
  }

  async componentDidMount() {
    let presetData = await Presets.getPresets(this.props.navigation.getParam('selected', '1')).then( data => {
      this.setState({
        plant: data, 
        newPlantName: data.name
      });
    }).catch((error) => {
      throw error;
    });
  }

  getSchedules = async () => {
    let scheduleData = await Schedule.getSchedule().then( data => {
      this.setState({
        wateringSchedule: data.watering_schedules, 
        lightingSchedule: data.lighting_schedules
      });
    }).catch((error) => {
      throw error;
    });;
  }

  addWaterSchedule = async (schedule) => { //rerender list view so that it shows the schedule that was just added
    let save = {
      schedule: {
        time: schedule.startDate, 
        repeat_days: schedule.repeatValue,
        repeat_end_date: schedule.endDate
      }, 
      amount: schedule.unitsValue
    };

    await Schedule.createWaterSchedule(save).then( data => {
      Alert.alert(
        'Watering Schedule added successfully'
      );
    })
    .catch((error) => {
      Alert.alert(
        'Error adding watering schedule: ' + error
      );
      throw error;
    });
    
    await this.getSchedules();
  }

  deleteWateringSchedule = async (scheduleId) => {
    await Schedule.deleteWaterSchedule(scheduleId).then( data => {
      Alert.alert(
        'Watering Schedule deleted successfully'
      );
    })    
    .catch((error) => {
      Alert.alert(
        'Error deleting watering schedule: ' + error
      );
      throw error;
    });

    await this.getSchedules();
  }

  addLightingSchedule = async (schedule) => { //rerender list view so that it shows the schedule that was just added
    let save = {
      schedule: {
        time: schedule.startDate, 
        repeat_days: schedule.repeatValue,
        repeat_end_date: schedule.endDate
      }, 
      length: schedule.unitsValue*60
    };

    await Schedule.createLightingSchedule(save).then( data => {
      Alert.alert(
        'Lighting Schedule added successfully'
      );
    })
    .catch((error) => {
      Alert.alert(
        'Error adding lighting schedule: ' + error
      );
      throw error;
    });
    
    await this.getSchedules();
  }

  deleteLightingSchedule = async (scheduleId) => {
    await Schedule.deleteLightingSchedule(scheduleId).then( data => {
      Alert.alert(
        'Lighting Schedule deleted successfully'
      );
    })
    .catch((error) => {
      Alert.alert(
        'Error deleting lighting schedule: ' + error
      );
      throw error;
    });

    await this.getSchedules();
  }

  saveAndGo = async () => {
    let name = {
      name: this.state.newPlantName
    }
    await Plant.updatePlant(name).then(data => {
      this.props.navigation.navigate('Instructions');
    })
    .catch((error) => {
      Alert.alert(
        'Error updating Plant Name: ' + error
      );
      throw error;
    });
  }

  render() {
    const icons = {
      PEPPER: 'pepper-hot',
      ROOT_VEG: 'carrot', 
      FRUIT_VEG: 'apple-alt', 
      HERB: 'leaf', 
      LEGUME: 'seedling',
    }

    const plant = this.state.plant;

    return (
      <ScrollView>
        <View style={CONTAINERS.main}>
          <View style={{paddingTop: 20}}></View>
          <Text style={FONTS.h4}>Currently Growing</Text>
          <Card style={CONTAINERS.plantType}>
            <Card.Content>
              <TextInput
                placeholder='Plant Type'
                value={this.state.newPlantName}
                onChangeText={text => this.setState({ newPlantName: text })}
                underlineColor={COLORS.grey5}
                dense={true}
                style={{
                  backgroundColor: 'white',
                  fontSize: 32,
                  fontWeight: 'bold',
                  color: COLORS.grey9
                }}
                theme={{colors: {primary: COLORS.green5}}}
              />
            </Card.Content>
          </Card>
          
          <Text style={FONTS.h4}>Recommended Growing Conditions</Text>
          <Card style={CONTAINERS.presetsCard}>
            <Card.Content>

              <View style={{ 
                flexDirection: 'row',
                justifyContent: "space-evenly",
                alignItems: "center",
                padding: '5%'
              }}> 
                <AwesomeIcon name={icons[plant.type]} size={85} color={COLORS.green5}/>
                <View style={{flexDirection: 'column', textAlign: 'center', width: 225, paddingLeft:50}}>
                  <Text style={FONTS.preset}>Lighting:</Text>
                  <Text style={FONTS.presetBold}>{plant.light_length/60} hours every {plant.light_repeat} days</Text>
                  <View style={{paddingTop: 10}}></View>
                  <Text style={FONTS.preset}>Watering</Text>
                  <Text style={FONTS.presetBold}>{plant.water_amount} ml every {plant.water_repeat} days</Text>
                </View>
              </View>

              <View style={{paddingTop: 15}}></View>
              <View style={{flexDirection: 'row', justifyContent: "right"}}>
                <Text style={FONTS.preset}>Ambient Temperature: </Text>
                <Text style={FONTS.presetBold}>{plant.temp_min}C - {plant.temp_max}C</Text>
              </View>

              <View style={{paddingTop: 5}}></View>
              <View style={{flexDirection: 'row', justifyContent: "right"}}>
                <Text style={FONTS.preset}>Ambient Humidity: </Text>
                <Text style={FONTS.presetBold}>{plant.humidity_min}% - {plant.humidity_max}%</Text>
              </View>

            </Card.Content>
          </Card>

          <Text style={FONTS.h4}>Watering Schedule</Text>
          <AddScheduleForm
            hide={() => {}}
            parent={'ios-water' /* ios-water or lightbulb-o */}
            main={false /* coming from main flow or setup flow */}
            schedules={this.state.wateringSchedule}
            addSchedule={this.addWaterSchedule}
            deleteSchedule={this.deleteWateringSchedule}
          />

          <Text style={FONTS.h4}>Lighting Schedule</Text>
          <AddScheduleForm
            hide={() => {}}
            parent={'lightbulb-o' /* ios-water or lightbulb-o */}
            schedules={this.state.lightingSchedule}
            addSchedule={this.addLightingSchedule}
            deleteSchedule={this.deleteLightingSchedule}
          />

          <BackAndNext 
            goBack={() => this.props.navigation.goBack()}
            next={this.saveAndGo}
          />  
        </View>
      </ScrollView>
    )
  }
}