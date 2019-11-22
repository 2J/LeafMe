import React, { Component } from 'react';
import { Banner, Surface } from 'react-native-paper';
import { Text, View, ScrollView } from 'react-native';
import Emoji from 'react-native-emoji';

import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../styles';

export default class CustomBanner extends Component {
  state = {
    username: "Steve Rogers"
  };
  
  render() {
    const emojiName = this.props.emoji;
    const parent = this.props.parent;
    let bannerText;
    
    //TODO: Center banner text that's only one line
    if(parent === 'Overview') {
      bannerText = <Text style={FONTS.banner}>Good morning, {this.state.username}</Text>;
    } else {
      bannerText = <Text style={FONTS.banner}>{parent}</Text>;
    }

    return (
      <Surface style={{zIndex: 1, elevation: 3}}>
        <Banner 
          visible={true}
          actions={[]} //required attribute, but we don't have any buttons in this banner
            style={COMPONENTS.banner}
        >
          {bannerText}
          <Emoji name={emojiName} style={{fontSize: 50}} />
        </Banner>
      </Surface>
    )
  }

}