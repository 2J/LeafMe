import React, {Component} from 'react';
import _ from 'lodash';
import { Button, Card, Divider } from 'react-native-paper';
import { StyleSheet, Modal, Text, TouchableHighlight, View, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { default as AwesomeIcon } from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import { COLORS, CONTAINERS, COMPONENTS, FONTS } from '../styles';
import { LIGHTINGLABELS, WATERINGLABELS } from './AddScheduleSelects';

export default class AddScheduleForm extends Component {
  state = {
    date: new Date('2020-06-12T14:42:42'),
    mode: 'date',
    show: false,
  }

  setDate = (event, date) => {
    date = date || this.state.date;
 
    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
    });
  }

  show = mode => {
    this.setState({
      show: !this.state.show,
      mode,
    });
  }
 
  datepicker = () => {
    this.show('date');
  }
 
  timepicker = () => {
    this.show('time');
  }
 
  render() {
    let data = [{
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
    }, {
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
    }, {
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
    }, {
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
    }];

    const { show, date, mode } = this.state;

    let labels;
    if(this.props.parent == 'ios-water') {
      labels = WATERINGLABELS;
    } else {
      labels = LIGHTINGLABELS;
    }

    let currentSchedules = [];
    _.forEach(this.props.schedules, schedule => {
      if(schedule.active) {
        currentSchedules.push(<Divider />);
        let start = new Date(schedule.schedule.time);
        let end = new Date(schedule.schedule.repeat_end_date);
        let magnitude;

        if(this.props.parent == 'ios-water') {
          magnitude = schedule.amount.toString() + " ml";
        } else {
          magnitude = (schedule.length/60).toString() + " hrs";
        }
      
        currentSchedules.push(
          <View style={{padding: 10}}>
            <Text>Starts On: {moment(start).format("DD MMM")}</Text>
            <Text>Start Time: {moment(start).format("h:mm a")}</Text>
            <Text>Ends On: {moment(end).format("DD MMM")}</Text>
            <Text>{labels.unitLabel}: {magnitude}</Text>
          </View>);
      }
    });

    if(currentSchedules.length == 0) {
      currentSchedules.push(
      <View style={{padding: 10}}>
        <Text>No schedules configured.</Text>
      </View>)
    }

    return (
      <Card style={CONTAINERS.listViewCard}>
        <Card.Content>
          <Text 
            style={{
              width: '95%',
              textAlign: 'right',
              color: COLORS.grey5, 
              fontWeight: 'bold',
              fontSize: 16, 
              paddingTop: 5
            }}
            onPress={() => this.props.hide(false)}>
            Close 
          </Text>
          <Text           
            style={{
              width: '95%',
              textAlign: 'left',
              paddingBottom: 5,
              fontSize: 20, 
              color: COLORS.grey9, 
              fontWeight: 'bold'
            }}>
              Current Schedules
          </Text>
          {/*<Text style={{paddingBottom: 25}}>None</Text>  TODO: Add schedule data here if they have them, if not say something like "no schedules added" or something */}
          
          {currentSchedules}
          
          <View style={{paddingBottom: 15}}></View>
          <Text style={FONTS.h3}>Add a New Schedule</Text>
          <Divider />

          <Text>Duration to keep lights on</Text>
          <Dropdown
            label='Select a number of hours'
            data={data}
          />
          <Text>Repeat every ____ days</Text>
            <Dropdown
              label='Select a number of days'
              data={data}
            />

          <Button 
            onPress={this.datepicker}
            mode='text'
            color={COLORS.green5}> 
            Show date picker
          </Button>
          <Button 
            onPress={this.timepicker}
            mode='text'
            color={COLORS.green5}> 
            Show time picker
          </Button>

          { show && <RNDateTimePicker value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={this.setDate} 
                    style={{
                      color: COLORS.grey9,
                      backgroundColor: COLORS.grey9
                    }}/>
          }
        </Card.Content>
      </Card>
    )
  }
}