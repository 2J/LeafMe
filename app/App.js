//Library Imports
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

//Component Imports
import Overview from './Overview/Overview';
import Account from './Account/Account';
import PlantSettings from './PlantSettings/PlantSettings';
import Metrics from './Metrics/Metrics';

//Style Imports
import COLORS from './styles';

const TabNavigator = createBottomTabNavigator(
  {
    Overview: Overview,
    Metrics: Metrics, 
    PlantSettings: PlantSettings, 
    Account: Account
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Overview') {
          iconName = 'home';
        } else if (routeName === 'PlantSettings') {
          iconName = 'seedling';
        } else if (routeName === 'Metrics') {
          iconName = 'chart-line';
        } else if (routeName === 'Account') {
          iconName = 'wrench';
        }

        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: COLORS.white,
      inactiveTintColor: COLORS.green3,
      style: {
        backgroundColor: COLORS.green5,
      }
    },
  }
);

export default createAppContainer(TabNavigator);