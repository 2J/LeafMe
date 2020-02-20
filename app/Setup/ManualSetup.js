import React, { Component } from 'react';
import { Alert, Text, View, ScrollView } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';

import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../styles';

//Model imports
import Schedule from '../Models/Schedule';
import AddScheduleForm from '../GrowingSchedule/AddScheduleForm';

export default class ManualSetup extends Component {
  state = {
    wateringSchedule: [],
    lightingSchedule: [], 
    plantType: 'Basil',
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
                value={this.state.plantType}
                onChangeText={text => this.setState({ plantType: text })}
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
          
          <View style={CONTAINERS.spaceBetween}>
            <Button 
              mode='text'
              color={COLORS.grey9}
              onPress={() => this.props.navigation.goBack()}
            >Back</Button>
            <Button 
              mode='contained'
              color={COLORS.green5}
              onPress={() => this.props.navigation.navigate('Overview')}
              contentStyle={{
                width: 100
              }}
            >Next</Button>
          </View>

        </View>
      </ScrollView>
    )
  }
}