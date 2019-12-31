import React, {Component} from 'react';
import _ from 'lodash';
import { Card  } from 'react-native-paper';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { default as AwesomeIcon } from 'react-native-vector-icons/FontAwesome';

import { COLORS, CONTAINERS, FONTS } from '../styles';

export default class InfoCard extends Component {
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
    <Card style={CONTAINERS.infoCard}>
      <Card.Content>
        <Text style={_.assignIn(FONTS.h3, {textAlign: 'center'})}>{this.props.title}</Text>
        <View style={{ 
          flexDirection: 'row',
          justifyContent: "space-between",
          alignItems: "center", 
          paddingTop: '15%'
        }}> 
          {iconComponent}
          <Text style={_.assignIn(FONTS.h1, {textAlign: 'center'})}>{this.props.status}</Text>
        </View>
      </Card.Content>
    </Card>
    );
  }
}