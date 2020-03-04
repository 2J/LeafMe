import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import CustomBanner from '../Components/CustomBanner';
import moment from 'moment';
import _ from 'lodash';

//Model Imports
import Sensors from '../Models/Sensors';
import Plant from '../Models/Plant';

//Component Imports
import ChartCard from './ChartCard';
import EmptyChartCard from './EmptyChartCard';

import { COLORS, CONTAINERS, FONTS } from '../styles';

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
        labels.push(moment(entry.time).format("ha"));
        values.push(entry.value);
      })
      this.setState({
        soilData: {
          labels: labels,
          datasets: [
            {
              data:values,
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
        labels.push(moment(entry.time).format("ha"));
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
        labels.push(moment(entry.time).format("ha"));
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
        labels.push(moment(entry.time).format("ha"));
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
    await Plant.getPlant().then(data => {
      this.setState({
        plantName: data.name
      })
    })
    .catch((error) => {
      Alert.alert(
        'Error getting Plant Name: ' + error
      );
      throw error;
    });
    await this.refreshSensors();
  }

  render() {
    const {
      soilData,
      brightnessData,
      temperatureData,
      humidityData
    } = this.state;

    const now = moment(new Date()).subtract(1, 'days').format('MMM DD YYYY') + ' - ' + moment(new Date()).format('MMM DD YYYY');

    return (
      <ScrollView>
        <CustomBanner 
          parent='Metrics'
          emoji='chart_with_upwards_trend'
        />
       
        <View style={CONTAINERS.main}>
          <Text style={FONTS.h1}>Currently Growing: {this.state.plantName}</Text>

          <View style={CONTAINERS.spaceBetween}>
            <Text style={FONTS.h4}>Plant Conditions</Text>
            <Button 
              mode='contained'
              color={COLORS.green5}
              onPress={this.refreshSensors}
              style={{marginBottom: 10}}
            >Refresh Charts</Button>
          </View>
            
          {soilData ?
            <ChartCard 
              data={soilData}
              yLabel="Bars (atm)"
              xLabel={now}
            /> : <EmptyChartCard />
          }
            
          <Text style={FONTS.h4}>Brightness</Text>
          {brightnessData ?
            <ChartCard 
              data={brightnessData}
              yLabel="Candela (cd)"
              xLabel={now}
            /> : <EmptyChartCard />
          }  

          <Text style={FONTS.h4}>Ambient Temperature</Text>
          {temperatureData ? 
            <ChartCard 
              data={temperatureData}
              yLabel="Celsius (C)"
              xLabel={now}
            /> : <EmptyChartCard />
          }  
          <Text style={FONTS.h4}>Ambient Humidity</Text>
          {humidityData ? 
            <ChartCard 
            data={humidityData}
            yLabel='Percentage%'
            xLabel={now}
            /> : <EmptyChartCard />
          }
        </View>
      </ScrollView>
    );
  }
}