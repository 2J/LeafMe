import React, { Component } from 'react';
import { Alert, Text, View, ScrollView } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { Button } from 'react-native-paper';
import _ from 'lodash';
import moment from 'moment';

//Model imports
import Schedule from '../Models/Schedule';
import Plant from '../Models/Plant';
import Event from '../Models/Event';

//Component Imports
import CalendarView from './CalendarView';
import ListView from './ListView';
import CustomBanner from '../Components/CustomBanner';
import { ManualWater, GenericConfirmation } from '../Dialogs';

//Styles
import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../styles';

class GrowingSchedule extends Component {
  state = {
    wateringEvents: [], 
    lightingEvents: [],

    plantName: '',
    manual: false,

    calendarView: false,
    waterNowAmount: '', 
    lightOn: true,

    waterNowDialog: false,
    deleteLightingDialog: false,
    addWaterDialog: false,
  };

  getSchedules = async () => {
    // let scheduleData = await Schedule.getSchedule().then( data => {
    //   this.setState({
    //     wateringSchedule: data.watering_schedules, 
    //     lightingSchedule: data.lighting_schedules
    //   });
    // }).catch((error) => {
    //   throw error;
    // });

    let eventData = await Event.getEvent().then(data => {
      this.setState({ 
        wateringEvents: data.watering_events,
        lightingEvents: data.lighting_events });
    }).catch((error) => {
      throw error;
    });
  }

  async componentDidMount(){
    this.updatePlant()
    .catch((error) => {
      Alert.alert(
        'Error getting Plant Name: ' + error
      );
      throw error;
    });

    await this.getSchedules();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.isFocused && !prevProps.isFocused) {
      this.updatePlant();
    }
  }

  async updatePlant(){
    Plant.getPlant().then(data => {
      this.setState({
        plantName: data.name,
        lightOn: data.manual_light,
        manual: data.manual_mode
      });
    })
  }

  waterNow = () => { 
    this.setState({
      waterNowDialog: true
    });
  }

  waterGo = async () => {
    await Schedule.waterNow(this.state.waterNowAmount).then(data => {
      Alert.alert(
        'Plant has been watered.'
      );
      this.setState({
        waterNowDialog: false
      });
    }).catch((error) => {
      throw error;
    }); 
  }

  addWaterSchedule  = async (schedule) => { //rerender list view so that it shows the schedule that was just added
    const endTime = this.getEndTime(schedule.startDate, schedule.endDate);

    let save = {
      schedule: {
        time: moment(schedule.startDate).seconds(0).milliseconds(0).toDate(), 
        repeat_days: schedule.repeatValue,
        repeat_end_date: endTime
      }, 
      amount: schedule.unitsValue
    };

    await Schedule.createWaterSchedule(save).then( async data => {
      this.setState({ addWaterDialog: true });
    })
    .catch((error) => {
      throw error;
    });
    await this.getSchedules();
  }

  deleteWateringSchedule = async (scheduleId) => {
    await Schedule.deleteWaterSchedule(scheduleId).then( data => {
      this.setState({ deleteWateringDialog: true });
    })    
    .catch((error) => {
      throw error;
    });

    await this.getSchedules();
  }

  toggleLight = async () => { //show confirmation message
    this.setState({
      lightOn: !this.state.lightOn
    });
    await Schedule.toggleLight().then(data => {
      this.updatePlant();
      Alert.alert(
        'Lighting Go'
      );
    }).catch((error) => {
      throw error;
    }); 
  }
  
  getEndTime = (start, end) => {
    if(moment(start).format('YYYY-MM-DD') === moment(end).format('YYYY-MM-DD')) {
      end = moment(end).hour(23);
      end = moment(end).minute(59);
      end = moment(end).seconds(59);
      return end;
    } else {
      return end;
    }
  }

  addLightingSchedule = async (schedule) => { //rerender list view so that it shows the schedule that was just added
    const endTime = this.getEndTime(schedule.startDate, schedule.endDate);
    
    let save = {
      schedule: {
        time: moment(schedule.startDate).seconds(0).milliseconds(0).toDate(), 
        repeat_days: schedule.repeatValue,
        repeat_end_date: endTime
      }, 
      length: schedule.unitsValue
    };

    await Schedule.createLightingSchedule(save).then( async data => {
      this.setState({addLightingDialog: true});
      await this.getSchedules();
    })
    .catch((error) => {
      Alert.alert(
        'Error adding watering schedule: ' + error
      );
      throw error;
    });
    
    
  }

  deleteLightingSchedule = async (scheduleId) => {
    await Schedule.deleteLightingSchedule(scheduleId).then( data => {
      this.setState({deleteLightingDialog: true})
    })
    .catch((error) => {
      Alert.alert(
        'Error deleting watering schedule: ' + error
      );
      throw error;
    });

    await this.getSchedules();
  }

  toggleView = () => {
    this.setState({
      calendarView: !this.state.calendarView
    });
  }

  render() {
    let childView;
    const { 
      wateringSchedule,
      lightingSchedule, 
      wateringEvents, 
      lightingEvents,

      plantName,
      manual,

      calendarView,
      waterNowAmount, 
      lightOn,

      waterNowDialog,
      addWaterDialog, 
      deleteWateringDialog,
      addLightingDialog,
      deleteLightingDialog
    } = this.state;
    if(this.state.calendarView) {
      childView = <CalendarView 
                    wateringEvents={wateringEvents}
                    lightingEvents={lightingEvents}
                  >
                  </CalendarView>
    } else {
      childView = <ListView 
                    // wateringSchedule={wateringSchedule} 
                    // lightingSchedule={lightingSchedule}
                    wateringEvents={wateringEvents}
                    lightingEvents={lightingEvents}

                    waterNow={this.waterNow}
                    addWaterSchedule={this.addWaterSchedule}
                    deleteWateringSchedule={this.deleteWateringSchedule}

                    toggleLight={this.toggleLight}
                    lightOn={lightOn}
                    addLightingSchedule={this.addLightingSchedule}
                    deleteLightingSchedule={this.deleteLightingSchedule}
                    manual={this.state.manual}
                  >
                  </ListView>
    }

    return (
        <ScrollView>
          <CustomBanner 
            parent='Plant Settings'
            emoji='seedling'
          />
          <View  style={CONTAINERS.main}>
            <Text style={FONTS.h1}>Currently Growing: {plantName}</Text>
            <View style={CONTAINERS.spaceBetween}>
              <Text style={_.assignIn(FONTS.h2, {paddingBottom: 10, width: '50%'})}>Schedule</Text>
              <Button 
                mode='contained'
                style={COMPONENTS.calendarToggleButton}
                onPress={this.toggleView}>
                {calendarView ? 'List View' : 'Calendar View'}
              </Button>
            </View>
            <View style={{paddingTop: 20}}></View> 
            {childView}
          </View>

          {/* Confirmation dialogs below */}
          <ManualWater          
            visible={waterNowDialog}
            onDismiss={() => {this.setState({waterNowDialog: false})}}
            waterNowAmount={waterNowAmount}
            onChangeText={(text) => this.setState({waterNowAmount: text})}
            onPress={this.waterGo}
          />

          <GenericConfirmation 
            message='Watering schedule successfully added.'
            onDismiss={() => {this.setState({addWaterDialog: false})}}
            visible={addWaterDialog}
          />

          <GenericConfirmation 
            message='Watering schedule successfully deleted.'
            onDismiss={() => {this.setState({deleteWateringDialog: false})}}
            visible={deleteWateringDialog}
          />

          <GenericConfirmation 
            message='Lighting schedule successfully added.'
            onDismiss={() => {this.setState({addLightingDialog: false})}}
            visible={addLightingDialog}
          />

          <GenericConfirmation 
            message='Lighting schedule successfully deleted.'
            onDismiss={() => {this.setState({deleteLightingDialog: false})}}
            visible={deleteLightingDialog}
          />

        </ScrollView>
    );
  }
}

export default withNavigationFocus(GrowingSchedule);
