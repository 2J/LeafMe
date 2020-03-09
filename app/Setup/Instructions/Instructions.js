import React, { Component } from 'react';
import { Alert, Text, View, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';

import First from './First';
import Step from './Step';
import Last from './Last';
import Step1 from '../../assets/s1.png';
import Step2 from '../../assets/s2.png';
import Step3 from '../../assets/s3.png';
import Step4 from '../../assets/s4.png';

import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../../styles';

export default class Instructions extends Component {
  render() {
    return (
        <Swiper 
          showsButtons={false}
          loop={false}
          activeDotColor={COLORS.green1}
        >
          <First goBack={() => this.props.navigation.goBack()}/>
          <Step instruction="1. Fill the tank to the indicated level with clean water." image={Step1}/>
          <Step instruction="2. Place your plant on top of the water tank, lining up the pot's drainage hole with the hole of the tank." image={Step2}/>
          <Step instruction="3. Adjust the lamp so that it is at least 10cm from the top of the plant." image={Step3}/>
          <Step instruction="4. Place the free end of the watering tube firmly into the soil." image={Step4}/>
          <Last done={() => this.props.navigation.navigate('Overview')} />
        </Swiper>
    );
  }
}