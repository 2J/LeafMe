import React, {Component} from 'react';
import { Text, View, ScrollView, Switch } from 'react-native';
import { Card, List } from 'react-native-paper';
import CustomBanner from '../Components/CustomBanner';

import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../styles';

import AccountModel from '../Models/Account';
import Plant from '../Models/Plant';

export default class Account extends Component {
  state = {
    connectionToggle: true, 
    modeToggle: true //true = manual, false = automatic
  }

  toggleConnection = () => {
    this.setState({
      connectionToggle: !this.state.connectionToggle
    })
  }

  toggleMode = async () => {
    await AccountModel.toggleMode(!this.state.modeToggle).then(data => {
      this.setState({
        modeToggle: !this.state.modeToggle
      });
    }).catch(error => {
      throw error;
    });
  }

  async componentDidMount(){
    await Plant.getPlant().then(data => {
      this.setState({
        modeToggle: data.manual_mode
      });
    })
    .catch((error) => {
      Alert.alert(
        'Error getting Plant data: ' + error
      );
      throw error;
    });
  }

  render() {
    const { connectionToggle, modeToggle } = this.state;
    return (
      <ScrollView>
        <CustomBanner 
          parent='Account Settings'
          emoji='cat'
        />
        <View style={CONTAINERS.main}>
          <Text style={FONTS.h4}>Account Settings</Text>
          <Card style={{
            backgroundColor: COLORS.white,
            shadowColor: COLORS.grey9, 
            shadowOffset: {
                width: 1, 
                height: 1
            }, 
            borderRadius: 10
          }}>
            <Card.Content>
              <List.Item
                title='Email'
                description='fakeemail@email.com'
                style={COMPONENTS.accountListItem}
              />
              <List.Item
                title='Password'
                description='*******'
                style={COMPONENTS.accountListItem}
              />
              <List.Item
                title='Name'
                description='Steve Rogers'
                style={{         
                  width: '106%',
                  marginLeft: -10,      
                }}
              />
            </Card.Content>
          </Card>
          
          <View style={{paddingTop: 20}}></View>
          <Text style={FONTS.h4}>Device Settings</Text>
          <Card style={{
            backgroundColor: COLORS.white,
            shadowColor: COLORS.grey9, 
            shadowOffset: {
                width: 1, 
                height: 1
            }, 
            borderRadius: 10
          }}>
            <Card.Content>
              <List.Item
                title='Device ID'
                description='XXXXXXXXXXXXXXXXXXXXXX'
                style={COMPONENTS.accountListItem}
              />
              <List.Item
                title='Wi-Fi Network Name'
                description='XXXXXXXXXXXXXXXXXXXXX'
                style={COMPONENTS.accountListItem}
              />
              <List.Item
                title='Connection'
                description={connectionToggle ? 'On' : 'Off'}
                style={COMPONENTS.accountListItem}
                right={ props => <Switch
                  style={COMPONENTS.switch}
                  onChange = {this.toggleConnection}
                  value = {connectionToggle}
                />}
              /> 
              <List.Item
                title='Mode'
                description={modeToggle ? 'Manual' : 'Automatic'}
                style={{         
                  width: '106%',
                  marginLeft: -10,  
                }}
                right={ props => <Switch
                  style={COMPONENTS.switch}
                  onChange = {this.toggleMode}
                  value = {modeToggle}
                />}
              />
                
              
            </Card.Content>
          </Card>

        </View>
      </ScrollView>
    );
  }
}