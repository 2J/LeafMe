import React, {Component} from 'react';
import _ from 'lodash';
import { Button, Card, Divider } from 'react-native-paper';
import { StyleSheet, Modal, Text, TouchableHighlight, View, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { default as AwesomeIcon } from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

import { COLORS, CONTAINERS, COMPONENTS, FONTS } from '../styles';

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
      show: true,
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
    return (
      <Card style={CONTAINERS.listViewCard}>
        <Card.Content>
          
          <Button 
            mode='text'
            color={COLORS.green5}
            style={{
              paddingTop: 50
            }}
            onPress={() => this.props.hide(false)}>
            Hide Modal 
          </Button>

          <Text>Duration to keep lights on</Text>
          <Dropdown
            label='Select a number of hours'
            data={data}
          />
          <Text>Turn on every ____ days</Text>
            <Dropdown
              label='Select a number of days'
              data={data}
            />

          <Button onPress={this.datepicker} title="Show date picker!" />
          <Button onPress={this.timepicker} title="Show time picker!" />

          { show && <DateTimePicker value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={this.setDate} />
          }
        </Card.Content>
      </Card>
    )
  }
}