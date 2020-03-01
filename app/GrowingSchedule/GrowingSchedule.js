import React, {Component} from 'react';
import { Alert, Text, View, ScrollView } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import { Dropdown } from 'react-native-material-dropdown';
import _ from 'lodash';

//Model imports
import Schedule from '../Models/Schedule';
import Plant from '../Models/Plant';
import Event from '../Models/Event';

//Component Imports
import CalendarView from './CalendarView';
import ListView from './ListView';
import CustomBanner from '../Components/CustomBanner';
import { WATERINGLABELS } from './AddScheduleSelects';

//Styles
import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../styles';

export default class GrowingSchedule extends Component {
  state = {
    wateringSchedule: ' ',
    lightingSchedule: ' ', 
    wateringEvents: ' ', 
    lightingEvents: ' ',
    plantName: '',
    calendarView: false,
    waterNowDialog: false,
    waterNowAmount: ''
  };

  getSchedules = async () => {
    let scheduleData = await Schedule.getSchedule().then( data => {
      this.setState({
        wateringSchedule: data.watering_schedules, 
        lightingSchedule: data.lighting_schedules
      });
    }).catch((error) => {
      throw error;
    });;

    let eventData = await Event.getEvent().then(data => {
      this.setState({ 
        wateringEvents: data.watering_events,
        lightingEvents: data.lighting_events });
    }).catch((error) => {
      throw error;
    });
  }

  async componentDidMount(){
    await Plant.getPlant().then(data => {
      this.setState({
        plantName: data.name
      })
    })
    .catch((error) => {
      Alert.alert(
        'Error getting Plant Name: ' + error
      );
      throw error;
    });
    await this.getSchedules();
  }

  waterNow = () => { //confirmation message or something probably
    this.setState({
      waterNowDialog: true
    });
  }

  waterGo = async () => {
    await Schedule.waterNow(this.state.waterNowAmount).then(data => {
      console.log(data);
      this.setState({
        waterNowDialog: false
      })
      Alert.alert(
        'Watering go!'
      );
    }).catch((error) => {
      throw error;
    }); 
  }

  addWaterSchedule  = async (schedule) => { //rerender list view so that it shows the schedule that was just added
    let save = {
      schedule: {
        time: schedule.startDate, 
        repeat_days: schedule.repeatValue,
        repeat_end_date: schedule.endDate
      }, 
      amount: schedule.unitsValue
    };

    await Schedule.createWaterSchedule(save).then( data => {
      this.setState({ addWaterSnackVisible: true });
    })
    .catch((error) => {
      throw error;
    });
    
    await this.getSchedules();
  }

  deleteWateringSchedule = async (scheduleId) => {
    await Schedule.deleteWaterSchedule(scheduleId).then( data => {
      this.setState({ deleteWaterSnackVisible: true });
    })    
    .catch((error) => {
      throw error;
    });

    await this.getSchedules();
  }

  toggleLight = () => { //show confirmation message
    Alert.alert(
      'Turn light on',
      'My Alert Msg',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')}
      ]
    );
  }

  addLightingSchedule = async (schedule) => { //rerender list view so that it shows the schedule that was just added
    let save = {
      schedule: {
        time: schedule.startDate, 
        repeat_days: schedule.repeatValue,
        repeat_end_date: schedule.endDate
      }, 
      length: schedule.unitsValue*60
    };

    await Schedule.createLightingSchedule(save).then( data => {
      Alert.alert(
        'Watering Schedule added successfully'
      );
    })
    .catch((error) => {
      Alert.alert(
        'Error adding watering schedule: ' + error
      );
      throw error;
    });
    
    await this.getSchedules();
  }

  deleteLightingSchedule = async (scheduleId) => {
    await Schedule.deleteLightingSchedule(scheduleId).then( data => {
      Alert.alert(
        'Watering Schedule deleted successfully'
      );
    })
    .catch((error) => {
      Alert.alert(
        'Error deleting watering schedule: ' + error
      );
      throw error;
    });

    await this.getSchedules();
  }

  toggleView = () => {
    this.setState({
      calendarView: !this.state.calendarView
    });
  }

  render() {
    let childView;
    const { 
      wateringEvents, 
      lightingEvents,
      wateringSchedule,
      lightingSchedule, 
      waterNowAmount,
      plantName,
      waterNowDialog,
      calendarView
    } = this.state;
    
    if(this.state.calendarView) {
      childView = <CalendarView 
                    wateringEvents={wateringEvents}
                    lightingEvents={lightingEvents}
                  >
                  </CalendarView>
    } else {
      childView = <ListView 
                    wateringSchedule={wateringSchedule} 
                    lightingSchedule={lightingSchedule}

                    waterNow={this.waterNow}
                    addWaterSchedule={this.addWaterSchedule}
                    deleteWateringSchedule={this.deleteWateringSchedule}

                    turnLightOn={this.toggleLight}
                    addLightingSchedule={this.addLightingSchedule}
                    deleteLightingSchedule={this.deleteLightingSchedule}
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
            <Text style={FONTS.h1}>Currently Growing: {plantName}</Text>
            <View style={CONTAINERS.spaceBetween}>
              <Text style={_.assignIn(FONTS.h2, {paddingBottom: 10, width: '50%'})}>Schedule</Text>
              <Button 
                mode='contained'
                style={COMPONENTS.calendarToggleButton}
                onPress={this.toggleView}>
                {calendarView ? 'List View' : 'Calendar View'}
              </Button>
            </View>
            <View style={{paddingTop: 20}}></View> 
            {childView}
          </View>

          <Portal>
            <Dialog
              visible={waterNowDialog}
              onDismiss={() => {this.setState({waterNowDialog: false})}}>
              <Dialog.Title>How much do you want to water? </Dialog.Title>
              <Dialog.Content>
                <Dropdown
                  label={WATERINGLABELS.unitsPlaceholder}
                  data={WATERINGLABELS.unitsData}
                  value={waterNowAmount}
                  containerStyle={COMPONENTS.dropdown}
                  dropdownOffset = {{
                    top: 10, 
                    left: 0
                  }}
                  rippleOpacity={0}
                  baseColor={COLORS.grey7}
                  fontSize={14}
                  onChangeText={(text) => this.setState({waterNowAmount: text})}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button color={COLORS.green5} onPress={() => {this.setState({waterNowDialog: false})}}>Cancel</Button>
                <Button color={COLORS.green5} onPress={this.waterGo}>Go</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

        </ScrollView>
    );
  }
}
