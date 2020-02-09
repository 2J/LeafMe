import React, { Component } from 'react';
import { Image, Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { Button} from 'react-native-paper';

import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../styles';
import logo from '../assets/icon.png';

export default class NetworkSettings extends Component {
  state = {
    serialNumber: ''
  }
  
  goToNetworkSettings = () => { 
    this.props.navigation.navigate('App');
  }

  render() {
    return (
      <KeyboardAvoidingView style={CONTAINERS.login} behavior="padding" enabled>
        
        <Text 
          style={{
            fontSize: 32, 
            color: COLORS.white, 
            fontWeight: 'bold', 
            paddingBottom: 30}}
          >Network Settings
        </Text>

        <Text 
          style={{
            fontSize: 24, 
            color: COLORS.grey9,  
            paddingBottom: 30}}
          >Next, let's set up your device. Please enter the name of your WiFi network and the network password. 
        </Text>
        
        <View style={{width: '100%'}}>
          <TextInput
            placeholder='Network Name'
            onChangeText={text => this.setState({ networkName: text })}
            style={COMPONENTS.loginInput}
          />
          <TextInput
            placeholder='Network Password'
            secureTextEntry={true}
            onChangeText={text => this.setState({ networkPassword: text })}
            style={COMPONENTS.loginInput}
          />
        </View>
        
        <View style={{alignItems: 'center'}}>
          <Button 
            mode='outlined'
            color={COLORS.green5}
            onPress={this.goToNetworkSettings}
            contentStyle={{
              width: 100, 
              backgroundColor: COLORS.white
            }}
          >Test Connection</Button>
        </View>

       </KeyboardAvoidingView>
    )
  }
}