//Library Imports
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

//Model Imports
import Plant from './Models/Plant';

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
      tabBarOnPress: async ({ navigation, defaultHandler }) => {
        if(navigation.state.routeName ==='GrowingSchedule'){
          let mode = await Plant.getPlant().then(data => {
            return data.manual_mode
          });
          navigation.navigate('GrowingSchedule', { mode: mode })
        }
        defaultHandler();
      }
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

const AppContainer = createAppContainer(
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

const pushTokenEndpoint = 'https://leafme.jj.ai/notification/pushtoken';

export async function registerForPushNotificationsAsync() {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  // only asks if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  // On Android, permissions are granted on app installation, so
  // `askAsync` will never prompt the user

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    alert('No notification permissions!');
    return;
  }

  // Get the token that identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  console.log(token);

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(pushTokenEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      plant_id: 1,
      push_token: token
    }),
  });
}

export default class App extends React.Component {
  state = {
    notification: {},
  };

  componentDidMount() {
    registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = notification => {
    // do whatever you want to do with the notification
    console.log(notification);
    this.setState({ notification: notification });
  };

  render() {
    return (
      <PaperProvider>
        <AppContainer />
      </ PaperProvider>
    )
  }
}