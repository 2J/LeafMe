import React, {Component} from 'react';
import { Text, View } from 'react-native';
import _ from 'lodash';
import moment from 'moment';

import ListViewCard from './ListViewCard';

import { COLORS, CONTAINERS, FONTS } from '../styles';

export default class ListView extends Component {
  render() {
    const {
      wateringSchedule,
      lightingSchedule,
      waterNow,
      addWaterSchedule,
      deleteWateringSchedule,
      toggleLight,
      lightOn,
      addLightingSchedule,
      deleteLightingSchedule,
      manual
    } = this.props;

    let watering = []; 
    let lighting = [];

    _.forEach(this.props.wateringSchedule, schedule => {
      if(schedule.active) {
        let start = new Date(schedule.schedule.time);
        let end;
        
        if (!schedule.schedule.repeat_end_date) {
          end = moment(start).add(30, 'd');
        } else {
          end = new Date(schedule.schedule.repeat_end_date);
        }

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
        let end;
        
        if (!schedule.schedule.repeat_end_date) {
          end = moment(start).add(30, 'd');
        } else {
          end = new Date(schedule.schedule.repeat_end_date);
        }
        
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
          mainButtonFunction={waterNow}
          addSchedule={addWaterSchedule}
          fullSchedule={wateringSchedule}
          deleteSchedule={deleteWateringSchedule}
          manual={manual}
        />
        <ListViewCard
          items={lighting}
          message='Your plant needs a lot of light'
          iconName='lightbulb-o'
          mainButtonName={lightOn ? 'Turn Light Off' : 'Turn Light On'}
          mainButtonFunction={toggleLight}
          addSchedule={addLightingSchedule}
          fullSchedule={lightingSchedule}
          deleteSchedule={deleteLightingSchedule}
          manual={manual}
        />
      </View>
    );
  }
}