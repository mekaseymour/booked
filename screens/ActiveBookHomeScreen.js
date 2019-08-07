import React, { Component } from 'react';
import { Alert, AsyncStorage, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';
import Svg from 'react-native-svg-uri';

import { Button, Colors, Typography } from '../styles';
import completeBook from '../helpers/completeBook';
import getCompleteByDate from '../helpers/getCompleteByDate';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import { fetchCurrentBook } from '../helpers/fetchFromStorage';

const SCREEN_PRIMARY_COLOR = Colors.pink;

class ActiveBookHomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  componentWillMount = () => {
    const book = this.props.book;
    const todaysDate = moment(new Date());
    const goalDate = moment(new Date(book.completeByGoal));

    this.setState({
      goalExpiration: book.completeByGoal,
      daysUntilGoalComplete: goalDate.diff(todaysDate, 'days'),
      pagesPerDay: this.pagesPerDay(),
    });
    this.setState({ loading: false });
  };

  showConfirmationAlert = () => {
    Alert.alert('Are you sure you want to finish this book?', 'This book will be added to your completed list.', [
      { text: 'Finish Book', onPress: this.finishBook },
      { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
    ]);
  };

  pagesPerDay = () => {
    const book = this.props.book;
    const startDate = moment(new Date(book.startDate));
    const goalDate = moment(new Date(book.completeByGoal));

    return Math.round(book.pages / goalDate.diff(startDate, 'days'));
  };

  pageGoalForDay = () => {
    const book = this.props.book;
    const startDate = moment(new Date(book.startDate));
    const todaysDate = moment(new Date()).add(1, 'days');

    return todaysDate.diff(startDate, 'days') * this.state.pagesPerDay;
  };

  finishBook = () => {
    this.props.finishBook();
    this.props.navigation.navigate('Complete', { book: this.props.book });
  };

  render() {
    return this.state.loading ? (
      <LoadingPlaceholder />
    ) : (
      <View style={styles.container}>
        <View style={styles.sectionWrapper}>
          <Svg width={88} height={114} source={require('../assets/images/unicorn-icon.svg')} />
          <Text style={Typography.screenHeader}>Currently reading</Text>
          <Text style={styles.bookTitle}>{this.props.book.bookTitle}</Text>
          <Text style={styles.secondaryHeader}>{`${this.state.daysUntilGoalComplete} days left to meet goal`}</Text>
        </View>
        <View style={styles.sectionWrapper}>
          <Text style={styles.reminderText}>{`You should be averaging about ${this.pagesPerDay()} pages per day`}</Text>
          <Text style={styles.reminderText}>{`(Aim to get to at least page ${this.pageGoalForDay()} today)`}</Text>
          <TouchableOpacity style={styles.ctaButton} onPress={this.showConfirmationAlert}>
            <Text style={Typography.buttonText}>Finish book</Text>
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
    flex: 1,
    alignItems: 'center',
    paddingTop: '10%',
    paddingLeft: '5%',
    paddingRight: '5%',
    justifyContent: 'space-between',
  },
  goalNoticeSection: {
    textAlign: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
  secondaryHeader: {
    ...Typography.screenSecondaryHeader,
    color: SCREEN_PRIMARY_COLOR,
  },
  bookTitle: {
    ...Typography.screenHeader,
    color: SCREEN_PRIMARY_COLOR,
    textAlign: 'center',
  },
  sectionWrapper: {
    alignItems: 'center',
    width: '100%',
  },
  ctaButton: {
    ...Button.ctaButton,
    backgroundColor: SCREEN_PRIMARY_COLOR,
    marginTop: 15,
  },
  reminderText: {
    fontSize: 14,
    color: SCREEN_PRIMARY_COLOR,
    textAlign: 'center',
  },
  changeGoal: {
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default ActiveBookHomeScreen;
