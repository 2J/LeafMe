import React, {Component} from 'react';
import { Alert, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import _ from 'lodash';

//Model imports
import Schedule from '../Models/Schedule';
import Event from '../Models/Event';

//Component Imports
import CalendarView from './CalendarView';
import ListView from './ListView';
import CustomBanner from '../Components/CustomBanner';

//Styles
import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../styles';

export default class GrowingSchedule extends Component {
  state = {
    wateringSchedule: ' ',
    lightingSchedule: ' ', 
    wateringEvents: ' ', 
    lightingEvents: ' ',
    plantType: 'Basil',
    calendarView: false
  };

  async componentDidMount(){
     let scheduleData = await Schedule.getSchedule().then( data => {
      this.setState({
        wateringSchedule: data.watering_schedules, 
        lightingSchedule: data.lighting_schedules
      });
    });

    let eventData = await Event.getEvent().then(data => {
      this.setState({ 
        wateringEvents: data.watering_events,
        lightingEvents: data.lighting_events });
    });
  }

  waterNow = () => { //confirmation message or something probably
    Alert.alert(
      'water now',
      'My Alert Msg',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }

  addWaterSchedule = (schedule) => { //rerender list view so that it shows the schedule that was just added
    let save = {
      schedule: {
        time: schedule.startDate, 
        repeat_days: schedule.repeatValue,
        repeat_end_date: schedule.endDate
      }, 
      amount: schedule.unitsValue,
      active: true
    };

    console.log(save)
  }

  turnLightOn = () => { //show confirmation message
    Alert.alert(
      'Turn light on',
      'My Alert Msg',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')}
      ]
    );
  }

  addLightingSchedule = (schedule) => { //rerender list view so that it shows the schedule that was just added
    let save = {
      schedule: {
        time: schedule.startDate, 
        repeat_days: schedule.repeatValue,
        repeat_end_date: schedule.endDate
      }, 
      length: schedule.unitsValue*60,
      active: true
    };

    console.log(save)
  }

  toggleView = () => {
    this.setState({
      calendarView: !this.state.calendarView
    });
  }

  render() {
    let childView;
    if(this.state.calendarView) {
      childView = <CalendarView 
                    wateringEvents={this.state.wateringEvents}
                    lightingEvents={this.state.lightingEvents}
                  >
                  </CalendarView>
    } else {
      childView = <ListView 
                    wateringSchedule={this.state.wateringSchedule} 
                    lightingSchedule={this.state.lightingSchedule}
                    waterNow={this.waterNow}
                    addWaterSchedule={this.addWaterSchedule}
                    turnLightOn={this.turnLightOn}
                    addLightingSchedule={this.addLightingSchedule}
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
            <Text style={FONTS.h1}>Currently Growing: {this.state.plantType}</Text>
            <View style={CONTAINERS.spaceBetween}>
              <Text style={_.assignIn(FONTS.h2, {paddingBottom: 10, width: '50%'})}>Schedule</Text>
              <Button 
                mode='contained'
                style={COMPONENTS.calendarToggleButton}
                onPress={this.toggleView}>
                {this.state.calendarView ? 'List View' : 'Calendar View'}
              </Button>
            </View>
            {childView}
          </View>
        </ScrollView>
    );
  }
}
