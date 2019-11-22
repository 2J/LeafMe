import React, {Component} from 'react';
import { Text, View, ScrollView } from 'react-native';
import CustomBanner from '../Components/CustomBanner';

export default class Account extends Component {
  render() {
    return (
      <ScrollView>
        <CustomBanner 
          parent='Account Settings'
          emoji='cat'
        />
      </ScrollView>
    );
  }
}