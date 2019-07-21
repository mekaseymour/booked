import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Button, Colors, Typography } from '../styles';
import CadencePicker from '../components/CadencePicker';
import Counter from '../components/Counter';
import getCompleteByDate from '../helpers/getCompleteByDate';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import Svg from 'react-native-svg-uri';
import { CADENCE_UNITS } from '../util/cadence';

class SetGoalScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      count: 1,
      cadenceIndex: 1,
    };
  }

  updateCount = number => {
    this.setState({ count: number });
  };

  updateCadenceIndex = i => {
    this.setState({ cadenceIndex: i });
  };

  updateBookGoal = () => {
    AsyncStorage.getItem('currentBook').then(book => {
      if (book) {
        const parsedBook = JSON.parse(book);

        getCompleteByDate().then(data => {
          if (data) {
            parsedBook.completeByGoal = data;

            console.log('parsedBook', parsedBook);

            AsyncStorage.setItem('currentBook', JSON.stringify(parsedBook)).then(() =>
              this.props.navigation.navigate('Home')
            );
          }
        });
      } else {
        this.props.navigation.navigate('Home');
      }
    });
  };

  setGoal = () => {
    const goalForStore = {
      cadenceUnit: CADENCE_UNITS[this.state.cadenceIndex],
      cadenceMultiplier: this.state.count,
    };

    AsyncStorage.setItem('goal', JSON.stringify(goalForStore)).then(() => this.updateBookGoal());
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sectionWrapper}>
          <View style={styles.iconWrapper}>
            <Svg height={56} width={68} source={require('../assets/images/summit-icon.svg')} />
          </View>
          <Text style={styles.header}>Reach for the shelves</Text>
          <Text style={styles.subHeader}>I want to finish reading a book every</Text>
          <Counter defaultCount={this.state.count} updateNumber={this.updateCount} />
          <CadencePicker
            defaultCadenceIndex={this.state.cadenceIndex}
            count={this.state.count}
            onPress={this.updateCadenceIndex}
          />
        </View>
        <View style={styles.completeSection}>
          <TouchableOpacity style={styles.button} onPress={this.setGoal}>
            <Text style={Typography.buttonText}>{`Let's Read -> `}</Text>
          </TouchableOpacity>
          <Text style={styles.note}>You can always adjust your reading goals later</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '20%',
    paddingRight: '10%',
    paddingLeft: '10%',
    backgroundColor: Colors.blue,
    justifyContent: 'space-between',
  },
  sectionWrapper: {
    alignItems: 'center',
  },
  header: {
    ...Typography.screenHeader,
    color: Colors.white,
    marginBottom: 10,
  },
  subHeader: {
    ...Typography.subHeader,
    color: Colors.white,
    textAlign: 'center',
  },
  iconWrapper: {
    marginBottom: 35,
  },
  contentText: {
    paddingLeft: 40,
    fontSize: 18,
    color: 'white',
    marginBottom: 30,
  },
  completeSection: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    ...Button.ctaButton,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 10,
  },
  note: {
    fontSize: 12,
    color: 'white',
    width: 180,
    textAlign: 'center',
  },
});

export default SetGoalScreen;
