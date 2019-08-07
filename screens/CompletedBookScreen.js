import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg from 'react-native-svg-uri';

import { Button, Colors, Typography } from '../styles';
import { timeBetweenBookStartAndEnd } from '../helpers/lengthOfTimeToFinishBook';

const SCREEN_PRIMARY_COLOR = Colors.pink;

class CompletedBookScreen extends Component {
  render() {
    const { navigation } = this.props;
    const book = navigation.getParam('book');

    return (
      <View style={styles.container}>
        <View style={styles.sectionWrapper}>
          <View style={styles.iconWrapper}>
            <Svg height={80} width={80} source={require('../assets/images/applause-icon.svg')} />
            <Svg height={80} width={80} source={require('../assets/images/confetti-icon.svg')} />
          </View>
          <Text style={Typography.secondaryHeader}>Another one in the books!</Text>
          <Text style={Typography.screenHeader}>You finished</Text>
          <Text style={styles.highlightedHeader}>{book.title}</Text>
          <Text style={styles.highlightedHeader}>{`in ${timeBetweenBookStartAndEnd(book)} days`}</Text>
        </View>
        <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('Inactive')}>
          <Text style={Typography.buttonText}>Let's read another -></Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '10%',
    paddingLeft: '5%',
    paddingRight: '5%',
    justifyContent: 'space-between',
  },
  highlightedHeader: {
    ...Typography.screenHeader,
    color: SCREEN_PRIMARY_COLOR,
    textAlign: 'center',
  },
  iconWrapper: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  sectionWrapper: {
    alignItems: 'center',
    width: '100%',
  },
  ctaButton: {
    ...Button.ctaButton,
    backgroundColor: Colors.pink,
  },
});

export default CompletedBookScreen;
