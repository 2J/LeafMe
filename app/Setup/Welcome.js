import React, { Component } from 'react';
import { Image, Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { Button} from 'react-native-paper';

import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../styles';
import logo from '../assets/icon.png';

export default class Welcome extends Component {
  state = {
    networkName: '',
    networkPassword: ''
  }

  goToNetworkSettings = () => { 
    this.props.navigation.navigate('NetworkSettings');
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
          >Welcome to LeafMe!
        </Text>

        <Text 
          style={{
            fontSize: 24, 
            color: COLORS.grey9,  
            paddingBottom: 30}}
          >First, enter the serial number of your device. The serial number can be found on the first page of the user's manual.
        </Text>
        
        <TextInput
          placeholder='Serial Number'
          onChangeText={text => this.setState({ serialNumber: text })}
          style={COMPONENTS.loginInput}
        />
        
        <View style={{alignItems: 'center'}}>
          <Button 
            mode='outlined'
            color={COLORS.green5}
            onPress={this.goToNetworkSettings}
            contentStyle={{
              width: 100, 
              backgroundColor: COLORS.white
            }}
          >Next</Button>
        </View>

       </KeyboardAvoidingView>
    )
  }
}