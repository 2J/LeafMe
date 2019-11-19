import React, {Component} from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import _ from 'lodash';
import WeekView from 'react-native-week-view';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      paddingTop: 22,
    },
    headerStyle: {
      backgroundColor: '#4286f4',
    },
  });

export default class CalendarView extends Component {

  render() {
   /* const events = [
        {
          id: 1,
          description: 'Event 1',
          startDate: this.generateDates(0),
          endDate: this.generateDates(2),
          color: 'blue',
        },
        {
          id: 2,
          description: 'Event 2',
          startDate: this.generateDates(1),
          endDate: this.generateDates(4),
          color: 'red',
        },
        {
          id: 3,
          description: 'Event 3',
          startDate: this.generateDates(-5),
          endDate: this.generateDates(-3),
          color: 'green',
        },
      ];*/

    let eventData = []; 
    _.forEach(this.props.events, event => {
        let start = new Date(event.start_time);
        let end = start.setMinutes(start.getMinutes() + event.length);
        let description;
        let color;

        if(event['lighting_schedule_id']) {
            description = 'Lighting Event';
            color = 'yellow';
        } else {
            description = 'Watering Event';
            color = 'blue';
        }
      eventData.push({
          id: event.id,
          description: description,
        startDate: start, 
        endDate: end,
        color: color

      });
    });
    selectedDate = new Date();

    return (
      <View style={styles.container}>
        <Text>Calendar View!</Text>
        <WeekView
          events={eventData}
          selectedDate={this.selectedDate}
          numberOfDays={7}
          headerStyle={styles.headerStyle}
          formatDateHeader="MMM D"
          locale="fr"
        />
      </View>
    );
  }
}

