import React, {Component} from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import _ from 'lodash';

//Model imports
import Schedule from '../Models/Schedule';
import Event from '../Models/Event';

//Component Imports
import CalendarView from './CalendarView';
import ListView from './ListView';
import CustomBanner from '../Components/CustomBanner';

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
                  >
                  </ListView>
    }

    return (
        <ScrollView>
          <CustomBanner 
            parent='Plant Settings'
            emoji='seedling'
          />
            <Button 
              title={this.state.calendarView ? 'List View' : 'Calendar View'}
              onPress={this.toggleView}>
            </Button>
            {childView}
        </ScrollView>
    );
  }
}