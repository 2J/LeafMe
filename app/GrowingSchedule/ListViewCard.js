import React, {Component} from 'react';
import _ from 'lodash';
import { Button, Card, Divider } from 'react-native-paper';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { default as AwesomeIcon } from 'react-native-vector-icons/FontAwesome';

import { COLORS, CONTAINERS, COMPONENTS, FONTS } from '../styles';

export default class ListViewCard extends Component {
  state = {
    eventListEnd: 6, //initially the list has 3 elements, the array is from 0 to 2, then add the dividers
    viewable: true //remove View More button if end of eventList is reached
  }

  viewMore = (eventList) => {
    if(this.state.eventListEnd + 6 > eventList.length ){
      this.setState({
        eventListEnd: eventList.length,
        viewable: false
      })
    } else {
      this.setState({
        eventListEnd: this.state.eventListEnd + 6
      })
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
        <View style={_.assignIn(CONTAINERS.spaceBetween, {padding: 10})}> 
          <Text style={{fontWeight: 'bold'}}>{event.date}</Text>     
          <Text>{event.time}</Text>
          <Text>{event.amount} ml</Text>
        </View>
        );
    });

    return (  
      <Card style={CONTAINERS.listViewCard}>
        <Card.Content>
          <View style={_.assignIn(CONTAINERS.spaceBetween, {paddingTop: '15%'})}> 
            {iconComponent}

            <View style={{width: '70%'}}>
              <Text style={_.assignIn(FONTS.h3, {paddingBottom: 15, textAlign: 'center'})}>
                Your plant needs very wet soil. 
              </Text>
            </View>
          </View>

          <Text style={{paddingBottom: 10}}>Upcoming Events</Text>
          { _.slice(eventList, 0, this.state.eventListEnd)}

          {this.state.viewable && 
          <View 
            style={{        
              alignItems: "center", 
              paddingTop: '5%'}}>
            <Button 
              mode='text'
              color={COLORS.green5}
              onPress={() => this.viewMore(eventList)}>
              View More
            </Button>
            </View> }

          <View style={_.assignIn(CONTAINERS.spaceBetween, {paddingTop: '15%'})}> 
            <Button 
              mode='contained'
              color={COLORS.green5}
              onPress={() => this.mainButton()}>
              {this.props.mainButtonName}
            </Button>
            <Button 
              mode='text'
              color={COLORS.green5}
              onPress={() => this.addSchedule()}>
              Add Schedule
            </Button>
          </View>
        </Card.Content>
      </Card>
    );
  }
}