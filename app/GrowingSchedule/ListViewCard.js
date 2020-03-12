import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { Button, Card, Divider } from 'react-native-paper';
import { StyleSheet, Modal, Text, TouchableHighlight, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { default as AwesomeIcon } from 'react-native-vector-icons/FontAwesome';

import { COLORS, CONTAINERS, COMPONENTS, FONTS } from '../styles';
import AddScheduleForm from './AddScheduleForm';
import Schedule from '../Models/Schedule';

export default class ListViewCard extends Component {
  state = {
    wateringSchedule: [],
    lightingSchedule: [],
    eventListEnd: 6, //initially the list has 3 elements, the array is from 0 to 2, then add the dividers
    viewable: true, //remove View More button if end of eventList is reached
    modalVisible: false,
    count: 0
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }


  viewMore = (eventList) => {
    if(this.state.eventListEnd + 6 > eventList.length ){
      this.setState({
        eventListEnd: eventList.length,
        viewable: false
      })
    } else {
      this.setState({
        eventListEnd: this.state.eventListEnd + 6,
        viewable: true
      })
    }
  }

  getSchedules = async () => {
    await Schedule.getSchedule().then( data => {
      this.setState({
        wateringSchedule: data.watering_schedules, 
        lightingSchedule: data.lighting_schedules
      });
    }).catch((error) => {
      throw error;
    });
  }

  render() {
    let iconComponent;

    const {
      items,
      message,
      iconName,
      mainButtonName,
      mainButtonFunction,
      addSchedule,
      deleteSchedule,
      manual
    } = this.props;

    

    const {
      eventListEnd, //initially the list has 3 elements, the array is from 0 to 2, then add the dividers
      viewable, //remove View More button if end of eventList is reached
      modalVisible,
      wateringSchedule,
      lightingSchedule,
      count
    } = this.state;

    if(iconName === 'ios-water') {
      iconComponent = <Icon name={iconName} size={100} color={COLORS.green5}/>;
    } else if(iconName === 'lightbulb-o') {
      iconComponent = <AwesomeIcon name={iconName} size={100} color={COLORS.green5}/>;
    }

    let eventList = [];
    _.forEach(items, event => {
      //eventList.push(<Divider/>); //push separately because elements need parents
      eventList.push(
        <Fragment key={"event-" + iconName + event.id}>      
          <Divider/>
          <View style={{ 
            flex: 1, 
            flexDirection: 'row', 
            justifyContent: 'space-between',
            paddingTop: 10, 
            paddingBottom: 10
          }}
          >
            <Text style={{fontWeight: 'bold'}}>{event.date}</Text>     
            <Text>{event.time}</Text>
            <Text>{event.amount}</Text>
          </View>
        </Fragment>
        );
    });

    if(eventList.length === 0) {
      eventList.push(
        <Text style={{textAlign: 'center', paddingBottom: 15}} key={99}>No events to show.</Text>
      );
    }

    return (  
      <Card style={CONTAINERS.listViewCard}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
          onShow={this.getSchedules}>
          <ScrollView
            style={{
              padding: 10
            }}>
            <AddScheduleForm
              hide={this.setModalVisible}
              parent={iconName /* ios-water or lightbulb-o */}
              main={true /* coming from main flow or setup flow */}
              wateringSchedule = {wateringSchedule}
              lightingSchedule = {lightingSchedule}
              addSchedule={addSchedule}
              deleteSchedule={deleteSchedule}
            />
          </ScrollView>
        </Modal>

        <Card.Content>
          <View style={_.assignIn(CONTAINERS.spaceBetween, {paddingTop: '12%'})}> 
            {iconComponent}

            <View style={{width: '70%', paddingTop: '15%'}}>
              <Text style={_.assignIn(FONTS.h3, {textAlign: 'center'})}>
                {message}
              </Text>
            </View>
          </View>

          <Text style={{paddingBottom: 10}}>Upcoming Events</Text>
          { _.slice(eventList, 0, eventListEnd)}

          {viewable && 
          <View 
            style={{        
              alignItems: "center", 
              paddingTop: 15,
              paddingBottom: 15}}>
            <Button 
              mode='text'
              color={COLORS.grey5}
              onPress={() => this.viewMore(eventList)}>
              View More
            </Button>
          </View> }
          
          <View style={{paddingTop: 20}}></View> 
          <View style={{
            flex: 1, 
            flexDirection: 'row-reverse', 
            justifyContent: 'space-evenly'
          }}> 
            <Text               
              onPress={() => {
                this.setModalVisible(true);
              }}
              style={{
                color: COLORS.green5,
                textTransform: 'uppercase',
                fontWeight: 'bold',
                width: 100, 
                marginLeft: 50,
                flexDirection: 'column'
              }}
            >
              Add/Remove Schedules
            </Text>            
            <Button 
              mode='contained'
              color={COLORS.green5}
              onPress={mainButtonFunction}
              style={{
                padding: 3,
                opacity: manual ? 100 : 0
              }}
              disabled={!manual}>
              {mainButtonName /* water now or turn light on/off */}
            </Button>
          </View>
        </Card.Content>
      </Card>
    );
  }
}
