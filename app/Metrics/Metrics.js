import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';

import { COLORS, CONTAINERS, FONTS } from '../styles';
import CustomBanner from '../Components/CustomBanner';

import ChartCard from './ChartCard';

export default class Metrics extends Component {
  render() {
    const soilData= {
      labels: ["Jan 10", "Jan 11", "Jan 12", "Jan 13", "Jan 14", "Jan 15", "Jan 16"],
      datasets: [
        {
          data: [50, 20, 45, 28, 80, 99, 43],
          color: (opacity = 1) => `rgba(17, 201, 14, ${opacity})`, // optional
          strokeWidth: 2 // optional
        }
      ]
    };

    const brightnessData= {
      labels: ["Jan 10", "Jan 11", "Jan 12", "Jan 13", "Jan 14", "Jan 15", "Jan 16"],
      datasets: [
        {
          data: [60, 35, 30, 18, 45, 71, 63],
          color: (opacity = 1) => `rgba(17, 201, 14, ${opacity})`, // optional
          strokeWidth: 2 // optional
        }
      ]
    };


    return (
      <ScrollView>
        <CustomBanner 
          parent='Metrics'
          emoji='chart_with_upwards_trend'
        />
        <View style={CONTAINERS.main}>
          <Text style={FONTS.h4}>Soil Moisture</Text>
          <ChartCard 
            data={soilData}
            yLabel="Bars (atm)"
            xLabel="Date"
          />

          <Text style={FONTS.h4}>Brightness</Text>
          <ChartCard 
            data={brightnessData}
            yLabel="Candela (cd)"
            xLabel="Date"
          />

          <Text style={FONTS.h4}>Ambient Temperature</Text>
          <ChartCard 
            data={soilData}
          />

          <Text style={FONTS.h4}>Ambient Humidity</Text>
          <ChartCard 
            data={soilData}
          />
        </View>
      </ScrollView>
    );
  }
}