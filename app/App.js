//Library Imports
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//AppStack Imports
import Overview from './Overview/Overview';
import Account from './Account/Account';
import GrowingSchedule from './GrowingSchedule/GrowingSchedule';
import Metrics from './Metrics/Metrics';

//AuthStack Imports
import Login from './Auth/Login';

//SetupStack Imports
import Welcome from './Setup/Welcome';
import NetworkSettings from './Setup/NetworkSettings';
import ManualOrPreset from './Setup/ManualOrPreset';
import ManualSetup from './Setup/ManualSetup';
import PresetCategory from './Setup/PresetCategory';
import PresetSpecies from './Setup/PresetSpecies';
import PresetSetup from './Setup/PresetSetup';
import Instructions from './Setup/Instructions/Instructions';

//Style Imports
import { COLORS } from './styles';

const AuthStack = createStackNavigator({
  Login: {
    screen: Login, 
    navigationOptions: {
      header: null,
    }
  }
});

const SetupStack = createStackNavigator(
  {
    Welcome: Welcome,
    NetworkSettings: NetworkSettings,
    ManualOrPreset: ManualOrPreset, 
    ManualSetup: ManualSetup,
    PresetCategory: PresetCategory, 
    PresetSpecies: PresetSpecies,
    PresetSetup: PresetSetup,
    Instructions: Instructions
  },
  {
    initialRouteName: 'Welcome',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  },
);

const TabNavigator = createBottomTabNavigator(
  {
    Overview: Overview,
    Metrics: Metrics, 
    GrowingSchedule: GrowingSchedule,
    Account: Account
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Overview') {
          iconName = 'home';
        } else if (routeName === 'GrowingSchedule') {
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
        height: 60,
        backgroundColor: COLORS.white,
      }
    },
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      App: TabNavigator,
      Auth: AuthStack,
      Setup: SetupStack
    },
    {
      initialRouteName: 'Auth',
    }
  )
);