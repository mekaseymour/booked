import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Input, Typography } from '../styles';
import Svg from 'react-native-svg-uri';
import { CADENCE_UNITS } from '../util/cadence';

class CadencePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: CADENCE_UNITS,
      selectedIndex: 1,
    };
  }

  changeOption = () => {
    if (this.state.selectedIndex >= 0 && this.state.selectedIndex <= this.state.options.length) {
    }
  };

  onUpPress = () => {
    if (this.state.selectedIndex < this.state.options.length - 1) {
      const newIndex = this.state.selectedIndex + 1;

      this.setState({ selectedIndex: newIndex });
      this.props.onPress(newIndex);
    } else {
      const newIndex = 0;

      this.setState({ selectedIndex: newIndex });
      this.props.onPress(newIndex);
    }
  };

  onDownPress = () => {
    if (this.state.selectedIndex > 0) {
      const newIndex = this.state.selectedIndex - 1;

      this.setState({ selectedIndex: newIndex });
      this.props.onPress(newIndex);
    } else {
      const newIndex = this.state.options.length - 1;

      this.setState({ selectedIndex: newIndex });
      this.props.onPress(newIndex);
    }
  };

  render() {
    return (
      <View style={styles.candenceContainer}>
        <TouchableOpacity onPress={this.onDownPress}>
          <Svg height={20} width={20} source={require('../assets/images/sort-down-icon.svg')} />
        </TouchableOpacity>
        <Text style={styles.cadenceText}>
          {this.props.count > 1
            ? `${this.state.options[this.state.selectedIndex]}s`
            : this.state.options[this.state.selectedIndex]}
        </Text>
        <TouchableOpacity onPress={this.onUpPress}>
          <Svg height={20} width={20} source={require('../assets/images/sort-up-icon.svg')} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  candenceContainer: {
    ...Input.mainInput,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: Colors.white,
  },
  cadenceText: {
    ...Typography.inputText,
    color: Colors.white,
  },
  cadenceChangeButton: {
    color: Colors.white,
  },
});

export default CadencePicker;
