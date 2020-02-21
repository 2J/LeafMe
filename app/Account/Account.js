import React, {Component} from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Card, List } from 'react-native-paper';
import CustomBanner from '../Components/CustomBanner';

import { COLORS, CONTAINERS, FONTS } from '../styles';

export default class Account extends Component {
  render() {
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
                style={{         
                  width: '106%',
                  marginLeft: -10,   
                  borderBottomWidth: 2,
                  borderBottomColor: COLORS.grey3
                }}
              />
              <List.Item
                title='Password'
                description='*******'
                style={{            
                  width: '106%',
                  marginLeft: -10,   
                  borderBottomWidth: 2,
                  borderBottomColor: COLORS.grey3
                }}
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
                style={{         
                  width: '106%',
                  marginLeft: -10,   
                  borderBottomWidth: 2,
                  borderBottomColor: COLORS.grey3
                }}
              />
              <List.Item
                title='Wi-Fi Network Name'
                description='XXXXXXXXXXXXXXXXXXXXX'
                style={{            
                  width: '106%',
                  marginLeft: -10,   
                  borderBottomWidth: 2,
                  borderBottomColor: COLORS.grey3
                }}
              />
              <List.Item
                title='Connection'
                description='On'
                style={{         
                  width: '106%',
                  marginLeft: -10,      
                }}
              />
            </Card.Content>
          </Card>

        </View>
      </ScrollView>
    );
  }
}