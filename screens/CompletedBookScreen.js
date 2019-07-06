import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Svg from 'react-native-svg-uri';

import { Typography } from '../styles';

class CompletedBookScreen extends Component {
  render() {
    const { bookTitle, navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text style={Typography.header}>Another one in the books!</Text>
        <Svg height={100} width={100} source={require('../assets/images/checkmark.svg')} />
        <Text>You just finished</Text>
        <Text>{bookTitle}</Text>
        <Button title="Start a new book" onPress={() => navigation.navigate('Inactive')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CompletedBookScreen;
