import React, {Component} from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import _ from 'lodash';
import WeekView from 'react-native-week-view';
import moment from 'moment';

import { COLORS, CONTAINERS } from '../styles';

export default class CalendarView extends Component {

  render() {

    let lightingEventData = []; 
    _.forEach(this.props.lightingEvents, event => {
      let start = new Date(event.start_time);
      let end = moment(start).add(event.length, 'minutes').toDate();
      lightingEventData.push({
        id: event.id,
        description: 'Lighting Event',
        startDate: start, 
        endDate: end,
        color: COLORS.yellow
      });
    });

    let wateringEventData = []; 
    _.forEach(this.props.wateringEvents, event => {
      let start = new Date(event.start_time);
      let end = moment(start).add(60, 'minutes').toDate();
      wateringEventData.push({
        id: event.id,
        description: 'Watering Event',
        startDate: start, 
        endDate: end,
        color: COLORS.blue
      });
    });

    let selectedDate = new Date();
    let allEvents = [...lightingEventData, ...wateringEventData];

    return (
      <View style={CONTAINERS.calendar.container}>
        
        <WeekView
          events={allEvents}
          selectedDate={selectedDate}
          numberOfDays={3}
          onEventPress={(event) => Alert.alert('eventId:' + JSON.stringify(event.start_time))}
          headerStyle={CONTAINERS.calendar.headerStyle}
          formatDateHeader="MMM D"
          locale="fr"
        />
      </View>
    );
  }
}

