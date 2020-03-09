import React, { Component } from 'react';
import { Image, Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-paper';
import _ from 'lodash';

import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../styles';
import logo from '../assets/icon.png';

export default class Login extends Component {
  state =  {
    email: '', 
    password: '', 
    first: true //if this is the user's first time using the app 
  }

  login = () => { // We don't actually have auth lmao 
    this.props.navigation.navigate(this.state.first ? 'Setup' : 'App');
  }

  render() {
    return (
      <KeyboardAvoidingView style={CONTAINERS.login} behavior="padding" enabled>
        <Image 
          style={{width: 100, height: 100, borderRadius: 25}}
          source={logo} />
        <Text style={FONTS.login}>Log In</Text>
        
        <View style={{width: '100%'}}>
          <TextInput
          placeholder='Email'
          onChangeText={text => this.setState({ email: text })}
          style={COMPONENTS.loginInput}
          />
          <TextInput
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })}
            style={COMPONENTS.loginInput}
          />

          <View style={{
            flexDirection: 'row', 
            justifyContent: 'space-between',
            }}
          >
            <Button mode='text' color={COLORS.white}>Forgot Password?</Button>
            <Button 
              mode='outlined'
              color={COLORS.green5}
              onPress={this.login}
              contentStyle={{
                width: 100, 
                backgroundColor: COLORS.white
              }}
            >
              Log In
            </Button>
          </View>
        </View>
        
        <View style={{alignItems: 'center'}}>
          <Text>Don't have an account?</Text>
          <Button mode='text' color={COLORS.white}>Sign Up</Button>
        </View>
        <Button mode='text' color={COLORS.white} onPress={() => this.props.navigation.navigate('Overview')}>Overview (Dev)</Button>
       </KeyboardAvoidingView>
    )
  }
}