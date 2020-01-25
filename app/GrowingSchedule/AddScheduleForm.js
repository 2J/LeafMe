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
    startDate: new Date(),
    endDate: new Date(),
    showStartDate: false, 
    showEndDate: false,
    unitsValue: '',
    repeatValue:''
  }

  setStartDate = (event, date) => {
    date = date || this.state.startDate;
    this.setState({
      startDate: date,
    });
  }

  setEndDate = (event, date) => {
    date = date || this.state.startDate;
    this.setState({
      endDate: date,
    });
  }

  showStartDate = () => {
    this.setState({
      showStartDate: !this.state.showStartDate
    });
  }

  showEndDate = () => {
    this.setState({
      showEndDate: !this.state.showEndDate
    });
  }
 
  render() {

    const {
      startDate,
      endDate,
      showStartDate, 
      showEndDate,
      unitsValue,
      repeatValue
    } = this.state;

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
        
      //TODO: add delete button + function to delete, delete should bubble up and render all the children that depend on this value so the thing that was just deleted doesn't show anymore
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
          
          {currentSchedules}
          
          <View style={{paddingBottom: 15}}></View>
          <Text style={FONTS.h3}>Add a New Schedule</Text>
          <Divider style={{marginBottom: 15, marginTop: 5}}/>

          <Text style={{paddingBottom: 5}}>Duration to keep lights on</Text>
          <Dropdown
            label='Select a number of hours'
            data={labels.unitsData}
            containerStyle={{
              backgroundColor: COLORS.grey1,
              borderRadius: 5, 
              marginBottom: 10
            }}
            dropdownOffset = {{
              top: 10
            }}
            rippleOpacity={0}
            baseColor={COLORS.grey7}
            fontSize={14}
          />
          <Text style={{paddingBottom: 5}}>Repeat every ____ days</Text>
            <Dropdown
              label='Select a number of days'
              data={labels.repeatData}
              containerStyle={{
                backgroundColor: COLORS.grey1,
                borderRadius: 5,
                marginBottom: 10
              }}
              dropdownOffset = {{
                top: 10, 
                left: 0
              }}
              rippleOpacity={0}
              baseColor={COLORS.grey7}
              fontSize={14}
            />

          <Text style={{paddingBottom: 5}}>{labels.startSelect}</Text>
          <TouchableHighlight
            onPress={this.showStartDate}
            style={{
              backgroundColor: COLORS.grey1,
              borderRadius: 5,
              padding: 10,
              marginBottom: 10
            }}
          >
          <Text style={{color: COLORS.grey7}}>{moment(startDate).format("DD MMM YYYY h:mm a")}</Text>
          </TouchableHighlight>
          { showStartDate && <RNDateTimePicker value={startDate}
                    mode="datetime"
                    is24Hour={true}
                    onChange={this.setStartDate} 
                    style={{
                      color: COLORS.grey9,
                      backgroundColor: COLORS.grey9, 
                      marginBottom: 10
                    }}/>
          }

          <Text style={{paddingBottom: 5}}>{labels.endSelect}</Text>
          <TouchableHighlight
            onPress={this.showEndDate}
            style={{
              backgroundColor: COLORS.grey1,
              borderRadius: 5,
              padding: 10,
              marginBottom: 10
            }}
          >
            <Text style={{color: COLORS.grey7}}>{moment(endDate).format("DD MMM YYYY")}</Text>
          </TouchableHighlight>
          { showEndDate && <RNDateTimePicker value={endDate}
                    mode="date"
                    is24Hour={true}
                    onChange={this.setEndDate} 
                    style={{
                      color: COLORS.grey9,
                      backgroundColor: COLORS.grey9, 
                      marginBottom: 10
                    }}/>
          }
        </Card.Content>
      </Card>
    )
  }
}