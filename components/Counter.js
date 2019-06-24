import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 0,
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    const incremented = this.state.number + 1;

    this.setState({ number: incremented });
    this.props.updateNumber(incremented);
  }

  decrement() {
    if (this.state.number > 0) {
      const decremented = this.state.number - 1;

      this.setState({ number: decremented });
      this.props.updateNumber(decremented);
    }
  }

  render() {
    return (
      <View style={styles.counterContainer}>
        <TouchableOpacity style={styles.button} onPress={this.decrement}>
          <Text style={styles.counterText}> - </Text>
        </TouchableOpacity>
        <Text style={styles.number}>{this.state.number}</Text>
        <TouchableOpacity style={styles.button} onPress={this.increment}>
          <Text style={styles.counterText}> + </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
  },
  counterText: {
    fontSize: 24,
    color: 'white',
  },
  number: {
    fontSize: 24,
    color: 'white',
    marginLeft: 20,
    marginRight: 20,
  },
});

export default Counter;
