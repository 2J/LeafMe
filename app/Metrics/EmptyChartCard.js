import React, { Component } from 'react';
import { Text } from 'react-native';
import _ from 'lodash';
import { Card  } from 'react-native-paper';

import { COLORS, CONTAINERS, FONTS } from '../styles';

export default class EmptyChartCard extends Component {
  render() {

    return (
    <Card style={CONTAINERS.chartCard}>
      <Card.Content style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>No data to show</Text>
      </Card.Content>
    </Card>
    );
  }
}