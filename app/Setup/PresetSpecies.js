import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import _ from 'lodash';
import { default as AwesomeIcon } from 'react-native-vector-icons/FontAwesome5';

import Presets from '../Models/Presets';
import Species from './Components/Species';
import BackAndNext from './Components/BackAndNext';
import { COLORS, COMPONENTS, CONTAINERS, FONTS } from '../styles';

export default class PresetSpecies extends Component {
  state = {
    species: [{
      id: 1, 
      title: "Banana"
    }], 
    selected: 0
  }

  async componentDidMount(){
    let presetData = await Presets.getSpecies(this.props.navigation.getParam('selected', 'PEPPER')).then( data => {
      this.setState({
        species: data
      });
    }).catch((error) => {
      throw error;
    });
  }

  onSelect = (id) => {
    this.setState({
      selected: id
    });
  }

  render() {
    const types = {
      PEPPER: 'Peppers',
      ROOT_VEG: 'Root Vegetables', 
      FRUIT_VEG: 'Fruits and Vegetables', 
      HERB: 'Herbs', 
      LEGUME: 'Legumes',
    }

    let speciesList = [];
    _.forEach(this.state.species, species => {
      speciesList.push({
        id: species.id.toString(), 
        title: species.name
      });
    });
    const previousSelection = this.props.navigation.getParam('selected', 'PEPPER');
    return(
      <View style={CONTAINERS.login}>
        <View style={{paddingTop: 20}}></View>
        <Text style={FONTS.smallerWhiteText}>Select the species of your plant.</Text>
        <Text style={FONTS.h1}>{types[previousSelection ? previousSelection : 'PEPPER']}</Text>
        <FlatList
          data={speciesList}
          renderItem={({ item }) => (
            <Species
              id={item.id}
              title={item.title}
              selected={this.state.selected}
              onSelect={this.onSelect}
            />
          )}
          style={{
            width: '100%',
            height: '50%', 
            backgroundColor: COLORS.grey1
          }}
        />

        <View style={{paddingTop: 20}}></View>
        <BackAndNext 
          goBack={() => this.props.navigation.goBack()}
          next={() => this.props.navigation.navigate('PresetSetup', { selected: this.state.selected })}
        />
      </View>
    )
  }
}