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
    Overview: OverviewStack,
    Metrics: MetricsStack, 
    PlantSettings: PlantSettingsStack,
    Account: AccountStack
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

        return <Icon name={iconName} size={35} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: COLORS.white,
      inactiveTintColor: COLORS.green3,
      showLabel: false,
      style: {
        backgroundColor: COLORS.green5,
      }
    },
  }
);

export default createAppContainer(TabNavigator);