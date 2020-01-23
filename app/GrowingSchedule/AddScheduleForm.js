import React, {Component} from 'react';
import _ from 'lodash';
import { Button, Card, Divider } from 'react-native-paper';
import { StyleSheet, Modal, Text, TouchableHighlight, View, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { default as AwesomeIcon } from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import RNDateTimePicker from '@react-native-community/datetimepicker';

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
    }];

    const { show, date, mode } = this.state;

    let labels;
    if(this.props.iconName == 'ios-water') {
      labels = WATERINGLABELS;
    } else {
      labels = LIGHTINGLABELS;
    }

    return (
      <Card style={CONTAINERS.listViewCard}>
        <Card.Content>
          <View style={CONTAINERS.spaceBetween}>
            <Button 
            mode='text'
            color={COLORS.grey5}
            style={{
              width: '20%'
            }}
            onPress={() => this.props.hide(false)}>
            Close 
            </Button>
            <Text style={FONTS.h3}>Current Schedules</Text>
          </View>
          <Divider />
          <Text style={{paddingBottom: 25}}>None</Text> {/* TODO: Add schedule data here if they have them, if not say something like "no schedules added" or something */}
          
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
                      backgroundColor: COLORS.grey1
                    }}/>
          }
        </Card.Content>
      </Card>
    )
  }
}