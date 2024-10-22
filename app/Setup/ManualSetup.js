import React, { Component } from 'react';
import { Alert, Text, View, ScrollView } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import moment from 'moment';

import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../styles';

//Model imports
import Schedule from '../Models/Schedule';
import Plant from '../Models/Plant';

//Component imports
import BackAndNext from './Components/BackAndNext';
import AddScheduleForm from '../GrowingSchedule/AddScheduleForm';

export default class ManualSetup extends Component {
  state = {
    wateringSchedule: [],
    lightingSchedule: [], 
    newPlantName: 'Basil',
  }

  async componentDidMount() {
    this.getSchedules();
  }

  getSchedules = async () => {
    await Schedule.getSchedule().then( data => {
      this.setState({
        wateringSchedule: data.watering_schedules, 
        lightingSchedule: data.lighting_schedules
      });
    }).catch((error) => {
      throw error;
    });
  }

  addWaterSchedule = async (schedule) => { //rerender list view so that it shows the schedule that was just added
    let save = {
      schedule: {
        time: moment(schedule.startDate).seconds(0).milliseconds(0).toDate(), 
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
        time: moment(schedule.startDate).seconds(0).milliseconds(0).toDate(), 
        repeat_days: schedule.repeatValue,
        repeat_end_date: schedule.endDate
      }, 
      length: schedule.unitsValue
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
    return (
      <ScrollView>
        <View style={CONTAINERS.main}>

          <Text 
            style={{
              fontSize: 32, 
              color: COLORS.grey9, 
              fontWeight: 'bold', 
              paddingBottom: 30, 
              paddingTop: 40}}
            >Manual Setup
          </Text>
          
          <Text style={FONTS.h4}>What are you growing?</Text>
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
                  fontSize: 20
                }}
                theme={{colors: {primary: COLORS.green5}}}
              />
            </Card.Content>
          </Card>

          <Text style={FONTS.h4}>Watering Schedule</Text>
          <AddScheduleForm
            hide={() => {}}
            parent={'ios-water' /* ios-water or lightbulb-o */}
            main={false /* coming from main flow or setup flow */}
            wateringSchedule = {this.state.wateringSchedule}
            addSchedule={this.addWaterSchedule}
            deleteSchedule={this.deleteWateringSchedule}
          />

          <Text style={FONTS.h4}>Lighting Schedule</Text>
          <AddScheduleForm
            hide={() => {}}
            parent={'lightbulb-o' /* ios-water or lightbulb-o */}
            lightingSchedule = {this.state.lightingSchedule}
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