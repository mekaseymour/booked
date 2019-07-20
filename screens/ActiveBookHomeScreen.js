import React, { Component } from 'react';
import { AsyncStorage, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';

import { Colors } from '../styles';
import completeBook from '../helpers/completeBook';
import getCompleteByDate from '../helpers/getCompleteByDate';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import { fetchCurrentBook } from '../helpers/fetchFromStorage';

class ActiveBookHomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      bookTitle: null,
      goalExpiration: null,
      daysUntilGoalComplete: null,
      loading: true,
    };
  }

  componentWillMount = () => {
    this.timeUntilGoalExpires();
  };

  timeUntilGoalExpires = async () => {
    // if goal is passed with route
    const cadenceRouteParam = this.props.navigation.getParam('cadence', null);

    console.log('cadenceRouteParam', this.props.navigation.state.params);

    if (cadenceRouteParam) {
      console.log('goal provided');

      getCompleteByDate(cadenceRouteParam);
    }

    const currentBook = await fetchCurrentBook();

    const todaysDate = moment(new Date());
    const completeByDate = moment(new Date(currentBook.completeByGoal));

    this.setState({
      bookTitle: currentBook.title,
      goalExpiration: currentBook.completeByGoal,
      daysUntilGoalComplete: completeByDate.diff(todaysDate, 'days'),
    });
    this.setState({ loading: false });
  };

  finishBook = () => {
    completeBook();
    this.props.navigation.navigate('Complete');
  };

  render() {
    const userIsBehindOnReadingGoal = this.state.daysUntilGoalComplete < 0;

    return this.state.loading ? (
      <LoadingPlaceholder />
    ) : (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this.timeUntilGoalExpires} />
        <Text>{userIsBehindOnReadingGoal ? `You're behind on your goal!` : `You're on track!`}</Text>
        <View style={styles.goalNoticeSection}>
          {userIsBehindOnReadingGoal ? (
            <Text>{`You are ${Math.abs(this.state.daysUntilGoalComplete)} behind on completing`}</Text>
          ) : (
            <View>
              <Text style={styles.headerText}>You have</Text>
              <Text style={styles.mainContentText}>{`${this.state.daysUntilGoalComplete} days`}</Text>
              <Text style={styles.headerText}>to complete</Text>
            </View>
          )}
        </View>
        <Text style={styles.bookTitle}>{this.state.bookTitle}</Text>
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.markCompleteButton} onPress={this.finishBook}>
            <Text style={styles.markCompleteButtonText}>Mark as completed</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Onboarding')}>
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
