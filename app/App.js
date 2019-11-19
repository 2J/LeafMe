//Library Imports
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//Component Imports
import Overview from './Overview/Overview';
import Account from './Account/Account';
import PlantSettings from './PlantSettings/PlantSettings';
import Metrics from './Metrics/Metrics';

//Style Imports
import { COLORS } from './styles';

const OverviewStack = createStackNavigator({
  Overview: { 
    screen: Overview, 
    navigationOptions: ({ navigation }) => ({
      title: 'Overview'
    })
  }
});

const MetricsStack = createStackNavigator({
  Metrics: { 
    screen: Metrics, 
    navigationOptions: ({ navigation }) => ({
      title: 'Metrics'
    })
  }
});

const PlantSettingsStack = createStackNavigator({
  PlantSettings: {
    screen: PlantSettings, 
    navigationOptions: ({ navigation }) => ({
      title: 'Plant Settings'
    })
  }
});

const AccountStack = createStackNavigator({
  Account: { 
    screen: Account, 
    navigationOptions: ({ navigation }) => ({
      title: 'Account Settings'
    })
  }
});

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

        return <Icon name={iconName} size={30} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: COLORS.green5,
      inactiveTintColor: COLORS.grey7,
      style: {
        height: 50,
        backgroundColor: COLORS.white,
      }
    },
  }
);

export default createAppContainer(TabNavigator);