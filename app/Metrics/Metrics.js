import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { COLORS, CONTAINERS, FONTS } from '../styles';
import CustomBanner from '../Components/CustomBanner';
import moment from 'moment';
import _ from 'lodash';

//Model Imports
import Sensors from '../Models/Sensors';

import ChartCard from './ChartCard';
import EmptyChartCard from './EmptyChartCard';

export default class Metrics extends Component {

  state = {
    soilData: false,
    brightnessData: false,
    temperatureData: false,
    humidityData: false
  }

  refreshSensors = async () => {
    const baseData = {
          labels: [],
          datasets: [
            {
              data: [],
              color: (opacity = 1) => `rgba(17, 201, 14, ${opacity})`, // optional
              strokeWidth: 2 // optional
            }
          ]
        };
    
    await Sensors.getSoilMoistureHistory().then( data => {
      let labels = [];
      let values = [];

      _.forEachRight(data, entry => {
        labels.push(moment(entry.time).format("MMM DD"));
        values.push(entry.value);
      })
      this.setState({
        soilData: {
          labels: labels,
          datasets: [
            {
              data: values,
              color: (opacity = 1) => `rgba(17, 201, 14, ${opacity})`, // optional
              strokeWidth: 2 // optional
            }
          ]
        }
      });
    });

    await Sensors.getBrightnessHistory().then( data => {
      let labels = [];
      let values = [];

      _.forEachRight(data, entry => {
        labels.push(moment(entry.time).format("MMM DD"));
        values.push(entry.value);
      })
      this.setState({
        brightnessData: {
          labels: labels,
          datasets: [
            {
              data: values,
              color: (opacity = 1) => `rgba(17, 201, 14, ${opacity})`, // optional
              strokeWidth: 2 // optional
            }
          ]
        }
      });
    });

    await Sensors.getTemperatureHistory().then( data => {
      let labels = [];
      let values = [];

      _.forEachRight(data, entry => {
        labels.push(moment(entry.time).format("MMM DD"));
        values.push(entry.value);
      })
      this.setState({
        temperatureData: {
          labels: labels,
          datasets: [
            {
              data: values,
              color: (opacity = 1) => `rgba(17, 201, 14, ${opacity})`, // optional
              strokeWidth: 2 // optional
            }
          ]
        }
      });
    });

    await Sensors.getHumidityHistory().then( data => {
      let labels = [];
      let values = [];

      _.forEachRight(data, entry => {
        labels.push(moment(entry.time).format("MMM DD"));
        values.push(entry.value);
      })
      this.setState({
        humidityData: {
          labels: labels,
          datasets: [
            {
              data: values,
              color: (opacity = 1) => `rgba(17, 201, 14, ${opacity})`, // optional
              strokeWidth: 2 // optional
            }
          ]
        }
      });
    });
  }

  async componentDidMount(){
    await this.refreshSensors();
  }

  render() {
    const {
      soilData,
      brightnessData,
      temperatureData,
      humidityData
    } = this.state;

    return (
      <ScrollView>
        <CustomBanner 
          parent='Metrics'
          emoji='chart_with_upwards_trend'
        />
        <Button 
          mode='contained'
          color={COLORS.green5}
          onPress={this.refreshSensors}
        >
          Refresh Charts
        </Button>
        
        <View style={CONTAINERS.main}>
          <Text style={FONTS.h4}>Soil Moisture</Text>
          {soilData ?
            <ChartCard 
              data={soilData}
              yLabel="Bars (atm)"
              xLabel="Date"
            /> : <EmptyChartCard />
          }
            
          <Text style={FONTS.h4}>Brightness</Text>
          {brightnessData ?
            <ChartCard 
              data={brightnessData}
              yLabel="Candela (cd)"
              xLabel="Date"
            /> : <EmptyChartCard />
          }  

          <Text style={FONTS.h4}>Ambient Temperature</Text>
          {temperatureData ? 
            <ChartCard 
              data={temperatureData}
              yLabel="Celsius (C)"
              xLabel="Date"
            /> : <EmptyChartCard />
          }  
          <Text style={FONTS.h4}>Ambient Humidity</Text>
          {humidityData ? 
            <ChartCard 
            data={humidityData}
            /> : <EmptyChartCard />
          }
        </View>
      </ScrollView>
    );
  }
}