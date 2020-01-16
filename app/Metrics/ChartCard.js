import React, { Component } from 'react';
import { Text } from 'react-native';
import _ from 'lodash';
import { Card  } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';

import { COLORS, CONTAINERS, FONTS } from '../styles';

export default class ChartCard extends Component {
  render() {

    const chartConfig = {
      backgroundGradientFrom: COLORS.white,
      backgroundGradientTo: COLORS.white,
      backgroundGradientToOpacity: 0,
      backgroundGradientFromOpacity: 0,
      fillShadowGradient: COLORS.green5,
      color: () => COLORS.grey9,
      decimalPlaces: 0,
      propsForBackgroundLines: {
        stroke: COLORS.grey5
      }
    };

    return (
    <Card style={CONTAINERS.chartCard}>
      <Card.Content>
        <Text>{this.props.yLabel}</Text>
        <LineChart
            data={this.props.data}
            width={350} 
            height={220}
            chartConfig={chartConfig}
            fromZero={true}
            style={{
              left: -35
            }}
          />
          <Text style={{textAlign: 'center'}}>{this.props.xLabel}</Text>
      </Card.Content>
    </Card>
    );
  }
}