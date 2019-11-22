import React, {Component} from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import _ from 'lodash';

//Model imports
import Schedule from '../Models/Schedule';
import Event from '../Models/Event';

//Component Imports
import CalendarView from './CalendarView';
import ListView from './ListView';

export default class PlantSettings extends Component {
  state = {
    wateringSchedule: 'stuff',
    lightingSchedule: 'stuff', 
    wateringEvents: 'more stuff', 
    lightingEvents: 'more stuff',
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

  toggleView = () => {
    this.setState({
      calendarView: !this.state.calendarView
    });
  }

  render() {
    let childView = <View></View>;
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
                  >
                  </ListView>
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ScrollView>
          <Text>Plant Settings!</Text>
            <Button 
              title={this.state.calendarView ? 'List View' : 'Calendar View'}
              onPress={this.toggleView}>
            </Button>
            {childView}
        </ScrollView>
      </View>
    );
  }
}