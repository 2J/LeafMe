import React, {Component} from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { COLORS } from '../styles';
import CustomBanner from '../Components/CustomBanner';

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
      <ScrollView>
        <CustomBanner 
          parent='Metrics'
          emoji='chart_with_upwards_trend'
        />
        <LineChart
          data={data}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          chartConfig={chartConfig}
        />
      </ScrollView>
    );
  }
}