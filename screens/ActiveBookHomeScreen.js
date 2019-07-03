import React, { Component } from 'react';
import { AsyncStorage, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg from 'react-native-svg-uri';
import moment from 'moment';

import { Colors } from '../styles';
import completeBook from '../helpers/completeBook';

class ActiveBookHomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      bookTitle: null,
      bookIsComplete: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('goal').then(data => {
      const goal = JSON.parse(data);

      this.setState({
        bookTitle: goal.book,
        goalExpiration: goal.completeBy,
      });
    });
  }

  timeUntilGoalExpires() {
    const todaysDate = moment(new Date());
    const completeByDate = moment(new Date(this.state.goalExpiration));

    return completeByDate.diff(todaysDate, 'days');
  }

  finishBook = () => {
    completeBook();
    this.setState({ bookIsComplete: true });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>You're on track!</Text>
        <View style={styles.goalNoticeSection}>
          <Text style={styles.headerText}>You have</Text>
          <Text style={styles.mainContentText}>{`${this.timeUntilGoalExpires()} days`}</Text>
          <Text style={styles.headerText}>to complete</Text>
        </View>
        <Text style={styles.bookTitle}>{this.state.bookTitle}</Text>
        {this.state.bookIsComplete ? (
          <Svg height={100} width={100} source={require('../assets/images/checkmark.svg')} />
        ) : (
          <View style={styles.buttonSection}>
            <View style={styles.functionButtonSection}>
              <TouchableOpacity style={styles.functionButton}>
                <Text style={styles.buttonText}>New Word</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.functionButton}>
                <Text style={styles.buttonText}>Add Note</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.markCompleteButton} onPress={this.finishBook}>
              <Text style={styles.markCompleteButtonText}>Mark as completed</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.changeGoal}>change goal</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  goalNoticeSection: {
    textAlign: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
  mainContentText: {
    color: Colors.blue,
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
  },
  bookTitle: {
    color: Colors.blue,
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
  buttonSection: {
    alignItems: 'center',
    width: '100%',
  },
  functionButtonSection: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  functionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
    width: '50%',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: Colors.darkGray,
    marginLeft: 5,
    marginRight: 5,
  },
  markCompleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
    width: '80%',
    borderRadius: 10,
    backgroundColor: Colors.blue,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
  },
  markCompleteButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '500',
  },
  changeGoal: {
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default ActiveBookHomeScreen;
