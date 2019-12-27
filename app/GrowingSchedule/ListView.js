import React, {Component} from 'react';
import { Text, View } from 'react-native';
import _ from 'lodash';

import ListViewCard from './ListViewCard';

import { COLORS, CONTAINERS } from '../styles';

export default class ListView extends Component {
  render() {
    let watering = []; 
    _.forEach(this.props.wateringSchedule, schedule => {
      watering.push(<Text key={schedule.id}> {JSON.stringify(schedule)}</Text>);
    });

    return (
      <View style={CONTAINERS.main}>
        <Text>List View!</Text>
        <ListViewCard
          items={watering}
          type='watering'
        />
      </View>
    );
  }
}