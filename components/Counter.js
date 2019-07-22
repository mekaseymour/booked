import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Input, Typography } from '../styles';

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: null,
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    const number = this.state.number || this.props.defaultCount;
    const incremented = number + 1;

    this.setState({ number: incremented });
    this.props.updateNumber(incremented);
  }

  decrement() {
    const number = this.state.number || this.props.defaultCount;

    if (number > 1) {
      const decremented = number - 1;

      this.setState({ number: decremented });
      this.props.updateNumber(decremented);
    }
  }

  render() {
    return (
      <View style={styles.counterContainer}>
        <TouchableOpacity onPress={this.decrement}>
          <Text style={styles.counterText}> - </Text>
        </TouchableOpacity>
        <Text style={styles.number}>{this.state.number || this.props.defaultCount}</Text>
        <TouchableOpacity onPress={this.increment}>
          <Text style={styles.counterText}> + </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  counterContainer: {
    ...Input.mainInput,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: Colors.white,
    marginTop: 25,
    marginBottom: 25,
  },
  counterText: {
    fontSize: 24,
    color: 'white',
  },
  number: {
    ...Typography.inputText,
    color: 'white',
  },
});

export default Counter;
