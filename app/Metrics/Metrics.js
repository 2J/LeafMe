import React, {Component} from 'react';
import { Text, View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { COLORS } from '../styles';

export default class Metrics extends Component {
  render() {
    const data = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 2 // optional
        }
      ]
    };

    const chartConfig = {
      backgroundGradientFrom: COLORS.white,
      backgroundGradientTo: COLORS.white,
      color: () => COLORS.grey9,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5
    };

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Metrics!</Text>
        <LineChart
          data={data}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          chartConfig={chartConfig}
        />
      </View>
    );
  }
}