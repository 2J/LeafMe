import React, {Component} from 'react';
import _ from 'lodash';
import { Card, Divider } from 'react-native-paper';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { default as AwesomeIcon } from 'react-native-vector-icons/FontAwesome';

import { COLORS, CONTAINERS, FONTS } from '../styles';

export default class ListViewCard extends Component {
  render() {
        let iconComponent;
    let iconName=this.props.iconName;

    if(iconName === 'ios-water') {
      iconComponent = <Icon name={iconName} size={70} color={COLORS.green5}/>;
    } else if(iconName === 'lightbulb-o') {
      iconComponent = <AwesomeIcon name={iconName} size={70} color={COLORS.green5}/>;
    } else if(iconName === 'thermometer-3'){
      iconComponent = <AwesomeIcon name={iconName} size={70} color={COLORS.green5} />;
    } else if(iconName === 'md-cloud'){
      iconComponent = <Icon name={iconName} size={65} color={COLORS.green5} />;
    }

    return (  
  <Card style={{        width: '100%', 

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
    <Icon name='md-cloud' size={65} color='black' />
    <Text style={{        
      fontSize: 32, 
  color: 'black', 
  fontWeight: 'bold', 
  paddingBottom: 15,textAlign: 'center'}}>Text</Text>
  </View>
  <Text>Upcoming Events</Text>
  <Divider />
  <View style={{ 
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center", 
    paddingTop: 5, 
    paddingBottom: 5
  }}> 
    <Text>13 July</Text>
    <Text>9:30am</Text>
    <Text>50ml</Text>        
  </View>
          <Divider />
  <View style={{ 
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center", 
    paddingTop: 5, 
    paddingBottom: 5
  }}> 
    <Text>13 July</Text>
    <Text>9:30am</Text>
    <Text>50ml</Text>        
  </View>
  </Card.Content>
  </Card>
   );
  }
}