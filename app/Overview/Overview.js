import React, {Component} from 'react';
import _ from 'lodash';
import { Text, View, ScrollView } from 'react-native';
import { Banner } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

//Style Imports
import { COLORS, CONTAINERS, FONTS } from '../styles';

export default class Overview extends Component {
  state = {
    visible: true,
    username: "Captain America"
  };
  render() {
    return (
      <View>
        <ScrollView>
          <Banner 
            visible={this.state.visible}
            actions={[]} //required attribute, but we don't have any buttons in this banner
              style={{
                backgroundColor: COLORS.green5, 
                padding: 5
              }}
            icon={({ size }) =>
              <Icon name='ios-sunny' size={80} color={COLORS.yellow} />
            }
          >
            <Text style={FONTS.banner}>Good Morning, </Text>
            <Text style={FONTS.banner}>{this.state.username}.</Text>
          </Banner>

          <View style={CONTAINERS.main}>
            <Text style={FONTS.h2}>Plant Status</Text>
            <Text style={FONTS.h1}>Your plant is doing poorly :( </Text>

            <Text style={_.assignIn(FONTS.h4, {paddingTop: 10})}>Plant Conditions </Text>
            
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{width: 160, height: 160, backgroundColor: 'powderblue'}} />
              <View style={{width: 160, height: 160, backgroundColor: 'skyblue'}} />
            </View> 

            <Text style={_.assignIn(FONTS.h4, {paddingTop: 10})}>Ambient Conditions </Text>
            
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{width: 160, height: 160, backgroundColor: 'steelblue'}} />
              <View style={{width: 160, height: 160, backgroundColor: 'turquoise'}} />
            </View>
          </View>

        </ScrollView>
      </View>
    );
  }
}