import React, {Component} from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import _ from 'lodash';

//Model imports
import Schedule from '../Models/Schedule';
import Event from '../Models/Event';

//Component Imports
import CalendarView from './CalendarView';
import ListView from './ListView';
import CustomBanner from '../Components/CustomBanner';

//Styles
import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../styles';

export default class GrowingSchedule extends Component {
  state = {
    wateringSchedule: 'stuff',
    lightingSchedule: 'stuff', 
    wateringEvents: 'more stuff', 
    lightingEvents: 'more stuff',
    plantType: 'Basil',
    calendarView: false
  };

  async componentDidMount(){
     let scheduleData = await Schedule.getSchedule().then( data => {
      this.setState({
        wateringSchedule: data.watering_schedules, 
        lightingSchedule: data.lighting_schedules
      });
    });

    let eventData = await Event.getEvent().then(data => {
      this.setState({ 
        wateringEvents: data.watering_events,
        lightingEvents: data.lighting_events });
    });
  }

  toggleView = () => {
    this.setState({
      calendarView: !this.state.calendarView
    });
  }

  render() {
    let childView;
    if(this.state.calendarView) {
      childView = <CalendarView 
                    wateringEvents={this.state.wateringEvents}
                    lightingEvents={this.state.lightingEvents}
                  >
                  </CalendarView>
    } else {
      childView = <ListView 
                    wateringSchedule={this.state.wateringSchedule} 
                    lightingSchedule={this.state.lightingSchedule}
                  >
                  </ListView>
    }

    return (
        <ScrollView>
          <CustomBanner 
            parent='Plant Settings'
            emoji='seedling'
          />
          <View  style={CONTAINERS.main}>
            <Text style={FONTS.h1}>Currently Growing: {this.state.plantType}</Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={_.merge(FONTS.h2, {paddingBottom: 10, width: '50%'})}>Schedule </Text>
              <Button 
                mode='contained'
                style={COMPONENTS.calendarListToggle}
                onPress={this.toggleView}>
                {this.state.calendarView ? 'List View' : 'Calendar View'}
              </Button>
            </View>
            {childView}
          </View>
        </ScrollView>
    );
  }
}

/***** MODAL EXAMPLE 
 *import React, { Component } from 'react';
import { StyleSheet, Modal, Text, TouchableHighlight, View } from 'react-native';

const styles = StyleSheet.create({
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default class LotsOfStyles extends Component {
  state = {
    modalVisible: false,
    count: 0
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                      this.setState({
      count: this.state.count+1
    })
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
                  <Text style={[styles.countText]}>
            { this.state.count !== 0 ? this.state.count: null}
          </Text>
      </View>
    );
  }
}

 */