import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Overview from './Overview/Overview';
import Account from './Account/Account';

const TabNavigator = createBottomTabNavigator({
  Overview: Overview,
  Metrics: Metrics, 
  PlantSettings: PlantSettings, 
  Account: Account
});

export default createAppContainer(TabNavigator);