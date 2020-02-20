import React, { Component } from 'react';
import { Alert, Text, View, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';

import First from './First';
import Step from './Step';
import Last from './Last';
import Picture from '../../assets/box-placeholder.png';

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
          <Step instruction="1" image={Picture}/>
          <Step instruction="2" image={Picture}/>
          <Step instruction="3" image={Picture}/>
          <Step instruction="4" image={Picture}/>
          <Last done={() => this.props.navigation.navigate('Overview')} />
        </Swiper>
    );
  }
}