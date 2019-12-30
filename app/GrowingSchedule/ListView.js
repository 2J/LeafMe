import React, {Component} from 'react';
import { Text, View } from 'react-native';
import _ from 'lodash';
import moment from 'moment';

import ListViewCard from './ListViewCard';

import { COLORS, CONTAINERS, FONTS } from '../styles';

export default class ListView extends Component {
  render() {
    let watering = []; 
    let wateringEvent = {
      date: '',
      time: '',
      amount: ''
    }

    _.forEach(this.props.wateringSchedule, schedule => {
      if(schedule.active) {
        let start = new Date(schedule.schedule.time);
        let end = new Date(schedule.schedule.repeat_end_date);
        while(start <= end) {

          watering.push({
            date: moment(start).format("DD MMM"),
            time: moment(start).format("h:mm a"),
            amount: schedule.amount
          });

          start = moment(start).add(schedule.schedule.repeat_days, 'd');
        }
      }
    });

    return (
      <View style={CONTAINERS.main}>
        <Text style={FONTS.h4}>Watering Schedule</Text>
        <ListViewCard
          items={watering}
          iconName='ios-water'
          mainButtonName='Water Now'
        />
      </View>
    );
  }
}