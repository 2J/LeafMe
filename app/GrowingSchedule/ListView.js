import React, {Component} from 'react';
import { Text, View } from 'react-native';
import _ from 'lodash';
import moment from 'moment';

import ListViewCard from './ListViewCard';

import { COLORS, CONTAINERS, FONTS } from '../styles';

export default class ListView extends Component {
  render() {
    let watering = []; 
    let lighting = [];

    _.forEach(this.props.wateringSchedule, schedule => {
      if(schedule.active) {
        let start = new Date(schedule.schedule.time);
        let end = new Date(schedule.schedule.repeat_end_date);
        while(start <= end) {
          
          let formattedAmount = schedule.amount.toString() + ' ml';
          watering.push({
            date: moment(start).format("DD MMM"),
            time: moment(start).format("h:mm a"),
            amount: formattedAmount
          });

          start = moment(start).add(schedule.schedule.repeat_days, 'd');
        }
      }
    });

    _.forEach(this.props.lightingSchedule, schedule => {
      if(schedule.active) {
        let start = new Date(schedule.schedule.time);
        let end = new Date(schedule.schedule.repeat_end_date);
        while(start <= end) {
          
          let formattedLength = (schedule.length/60).toString() + " hrs";
          lighting.push({
            date: moment(start).format("DD MMM"),
            time: moment(start).format("h:mm a"),
            amount: formattedLength
          });

          start = moment(start).add(schedule.schedule.repeat_days, 'd');
        }
      }
    });

    return (
      <View>
        <Text style={FONTS.h4}>Watering Schedule</Text>
        <ListViewCard
          items={watering}
          iconName='ios-water'
          message='Your plant needs very wet soil'
          mainButtonName='Water Now'
          mainButtonFunction={this.props.waterNow}
          addSchedule={this.props.addWaterSchedule}
          fullSchedule={this.props.wateringSchedule}
          deleteSchedule={this.props.deleteWateringSchedule}
        />
        <ListViewCard
          items={lighting}
          message='Your plant needs a lot of light'
          iconName='lightbulb-o'
          mainButtonName='Turn Light On'
          mainButtonFunction={this.props.turnLightOn}
          addSchedule={this.props.addLightingSchedule}
          fullSchedule={this.props.lightingSchedule}
          deleteSchedule={this.props.deleteLightingSchedule}
        />
      </View>
    );
  }
}