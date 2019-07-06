import React, { Component } from 'react';
import { AsyncStorage, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';

import { Colors } from '../styles';
import completeBook from '../helpers/completeBook';
import getCompleteByDate from '../helpers/getCompleteByDate';

class ActiveBookHomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      bookTitle: null,
      goalExpiration: null,
    };
  }

  componentWillMount = () => {
    AsyncStorage.getItem('currentBook').then(book => {
      if (book) {
        const parsedBook = JSON.parse(book);

        this.setState({ bookTitle: parsedBook.title, goalExpiration: parsedBook.completeByGoal });
      }
    });

    getCompleteByDate().then(data => {
      this.setState({ goalExpiration: data });
    });
  };

  timeUntilGoalExpires() {
    const todaysDate = moment(new Date());
    const completeByDate = moment(new Date(this.state.goalExpiration));

    return completeByDate.diff(todaysDate, 'days');
  }

  finishBook = () => {
    completeBook();
    this.props.navigation.navigate('Complete');
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
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.markCompleteButton} onPress={this.finishBook}>
            <Text style={styles.markCompleteButtonText}>Mark as completed</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.changeGoal}>change goal</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
