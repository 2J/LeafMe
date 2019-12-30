import React, {Component} from 'react';
import _ from 'lodash';
import { Button, Card, Divider } from 'react-native-paper';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { default as AwesomeIcon } from 'react-native-vector-icons/FontAwesome';

import { COLORS, CONTAINERS, FONTS } from '../styles';

export default class ListViewCard extends Component {
  state = {
    eventListEnd: 6, //initially the list has 3 elements, the array is from 0 to 2, then add the dividers
    viewable: 'true' //remove View More button if end of eventList is reached
  }

  viewMore = (eventList) => {
    if(this.state.eventListEnd + 6 > eventList.length ){
      this.setState({
        eventListEnd: eventList.length,
        viewable: 'false'
      })
    } else {
      this.setState({
        eventListEnd: this.state.eventListEnd+6
      })
    }
  }

  mainButton = () => {
    if(this.props.mainButtonName = 'Water Now') { 

    } else { //Turn Light On

    }
  }

  addSchedule = () => {
    if(this.props.mainButtonName = 'Water Now') { //Add Watering Schedule

    } else { //Add Lighting Schedule

    }
  }

  render() {
    let iconComponent;
    let iconName=this.props.iconName;

    if(iconName === 'ios-water') {
      iconComponent = <Icon name={iconName} size={100} color={COLORS.green5}/>;
    } else if(iconName === 'lightbulb-o') {
      iconComponent = <AwesomeIcon name={iconName} size={100} color={COLORS.green5}/>;
    }

    let eventList = [];
    _.forEach(this.props.items, event => {
      eventList.push(<Divider />); //push separately because elements need parents
      eventList.push(      
        <View style={{ 
          flexDirection: 'row',
          justifyContent: "space-between",
          alignItems: "center", 
          paddingTop: 10, 
          paddingBottom: 10
          }}> 
          <Text style={{fontWeight: 'bold'}}>{event.date}</Text>     
          <Text>{event.time}</Text>
          <Text>{event.amount} ml</Text>
        </View>
        );
    });

    return (  
    <Card style={{        
    width: '100%', 
    backgroundColor: 'white',
    shadowColor: 'black', 
    shadowOffset: {
      width: 1, 
      height: 1
    }, 
    borderRadius: 10}}>

    <Card.Content>
      <View style={{ 
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center", 
        paddingTop: '15%'
      }}> 
        {iconComponent}

        <View style={{width: '70%'}}>
          <Text style={_.assignIn(FONTS.h3, {paddingBottom: 15, textAlign: 'center'})}>
            Your plant needs very wet soil. 
          </Text>
        </View>
      </View>

      <Text style={{paddingBottom: 10}}>Upcoming Events</Text>
      { _.slice(eventList, 0, this.state.eventListEnd)}

      <View 
        visible={this.state.viewable}
        style={{        
          alignItems: "center", 
          paddingTop: '15%'}}>
        <Button 
          mode='text'
          onPress={() => this.viewMore(eventList)}>
          View More
        </Button>
      </View>

      <View style={{ 
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center", 
        paddingTop: '15%'
      }}> 
        <Button 
          mode='contained'
          onPress={() => this.mainButton()}>
          {this.props.mainButtonName}
        </Button>
        <Button 
          mode='text'
          onPress={() => this.addSchedule()}>
          Add Schedule
        </Button>
      </View>
    </Card.Content>
  </Card>
   );
  }
}