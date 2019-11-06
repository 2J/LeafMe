import React, {Component} from 'react';
import { Text, View } from 'react-native';

export default class Account extends Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Account Settings!</Text>
        </View>
      );
    }
}