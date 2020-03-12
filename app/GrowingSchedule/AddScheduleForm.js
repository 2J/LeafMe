import React, { Component } from 'react';
import _ from 'lodash';
import { Button, Card, Divider } from 'react-native-paper';
import { Text, TouchableHighlight, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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

  setUnits = (text) => {
    this.setState({
      unitsValue: text
    })
  }

  setRepeat = (text) => {
    this.setState({
      repeatValue: text
    })
  }

  saveSchedule = () => {
    this.props.hide(false);
    this.props.addSchedule(this.state);
  }

  deleteSchedule = (id) => {
    this.props.hide(false);
    this.props.deleteSchedule(id);
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
      console.log(schedule);
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
            <MaterialIcons name='delete' size={25} color={COLORS.grey5} onPress={() => this.deleteSchedule(schedule.id)} style={{
              alignSelf: 'flex-end',
              zIndex: 5
            }}/>
            <View style={{
              marginTop: -25
            }}>
              <Text>Starts On: {moment(start).format("DD MMM")}</Text>
              <Text>Start Time: {moment(start).format("h:mm a")}</Text>
              <Text>Ends On: {moment(end).format("DD MMM")}</Text>
              <Text>Repeats Every: {schedule.schedule.repeat_days} days</Text>
              <Text>{labels.unitLabel}: {magnitude}</Text>
            </View>

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
      <Card style={CONTAINERS.addScheduleCard}>
        <Card.Content>
          {this.props.main && <Text 
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
          </Text>}
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

          <Text style={COMPONENTS.labelsSpacing}>{labels.unitsSelect}</Text>
          <Dropdown
            label={labels.unitsPlaceholder}
            data={labels.unitsData}
            value={unitsValue}
            containerStyle={COMPONENTS.dropdown}
            dropdownOffset = {{
              top: 10, 
              left: 0
            }}
            rippleOpacity={0}
            baseColor={COLORS.grey7}
            fontSize={14}
            onChangeText={this.setUnits}
          />

          <Text style={COMPONENTS.labelsSpacing}>{labels.repeatSelect}</Text>

          <View style={CONTAINERS.spaceBetween}>
            <Dropdown
              label={labels.repeatPlaceholder}
              data={labels.repeatData}
              value={repeatValue}
              containerStyle={COMPONENTS.dropdown}
              dropdownOffset = {{
                top: 10, 
                left: 0
              }}
              rippleOpacity={0}
              baseColor={COLORS.grey7}
              fontSize={14}
              onChangeText={this.setRepeat}
            />
            <Text style={{paddingBottom: 5, paddingTop: 12, paddingRight: 5}}>Days</Text>
          </View>

          <Text style={COMPONENTS.labelsSpacing}>{labels.startSelect}</Text>
          <TouchableHighlight
            onPress={this.showStartDate}
            style={COMPONENTS.datepickerButton}
          >
          <Text style={{color: COLORS.grey7}}>{moment(startDate).format("DD MMM YYYY h:mm a")}</Text>
          </TouchableHighlight>
          { showStartDate && <RNDateTimePicker value={startDate}
                    mode="datetime"
                    is24Hour={true}
                    onChange={this.setStartDate} 
                    style={COMPONENTS.datepicker}/>
          }

          <Text style={COMPONENTS.labelsSpacing}>{labels.endSelect}</Text>
          <TouchableHighlight
            onPress={this.showEndDate}
            style={COMPONENTS.datepickerButton}
          >
            <Text style={{color: COLORS.grey7}}>{moment(endDate).format("DD MMM YYYY")}</Text>
          </TouchableHighlight>
          { showEndDate && <RNDateTimePicker value={endDate}
                    mode="date"
                    is24Hour={true}
                    onChange={this.setEndDate} 
                    style={COMPONENTS.datepicker}/>
          }
          <Button 
            mode='contained'
            color={COLORS.green5}
            onPress={this.saveSchedule}
            style={{
              marginBottom: 10, 
              marginTop: 10,
              alignSelf: 'flex-end',
              width: 180,
            }}
          >
            Save Schedule
          </Button>

        </Card.Content>
      </Card>
    )
  }
}