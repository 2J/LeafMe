import React, {Component} from 'react';
import { Text, View, ScrollView } from 'react-native';
import _ from 'lodash';

//Model imports
import Schedule from '../Models/Schedule';
import Event from '../Models/Event';

export default class PlantSettings extends Component {
  state = {
    wateringSchedule: 'stuff',
    lightingSchedule: 'stuff', 
    events: 'more stuff', 
    calendarView: false
  };

  async componentDidMount(){
     let wateringSchedule = await Schedule.getSchedule().then( data => {
      this.setState({
        wateringSchedule: data.watering_schedules, 
        lightingSchedule: data.lighting_schedules
      });
    });

    let eventData = await Event.getEvent().then(data => {
      this.setState({ events: data });
    });
  }

  render() {
    let events = []; 
    _.forEach(this.state.events, event => {
      events.push(<Text key={event.id}> {JSON.stringify(event)}</Text>);
    });
    
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ScrollView>
          <Text>Plant Settings!</Text>
            {events}
        </ScrollView>
      </View>
    );
  }
}