import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Overview from './Overview';
import Settings from './Settings';

/* export default class App extends Component {
  render() {
    return (
        <View  style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Hello, World!</Text>
        </View>
    );
  }
}
 */
const TabNavigator = createBottomTabNavigator({
  Overview: Overview,
  Settings: Settings
});

export default createAppContainer(TabNavigator);