import React, {Component} from 'react';
import { Text, View } from 'react-native';
import _ from 'lodash';

export default class ListView extends Component {
  render() {
    let watering = []; 
    _.forEach(this.props.wateringSchedule, schedule => {
      watering.push(<Text key={schedule.id}> {JSON.stringify(schedule)}</Text>);
    });

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>List View!</Text>
        {watering}
      </View>
    );
  }
}