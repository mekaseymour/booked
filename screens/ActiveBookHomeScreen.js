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

  constructor(props) {
    super(props);

    this.state = {
      book: null,
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
    const currentBook = await fetchCurrentBook();

    const todaysDate = moment(new Date());
    const goalDate = moment(new Date(currentBook.completeByGoal));

    this.setState({
      book: currentBook,
      bookTitle: currentBook.title,
      goalExpiration: currentBook.completeByGoal,
      daysUntilGoalComplete: goalDate.diff(todaysDate, 'days'),
    });
    this.setState({ loading: false });
  };

  showConfirmationAlert = () => {
    Alert.alert('Are you sure you want to finish this book?', 'This book will be added to your completed list.', [
      { text: 'Finish Book', onPress: this.finishBook },
      { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
    ]);
  };

  finishBook = () => {
    completeBook();
    this.props.navigation.navigate('Complete', { book: this.state.book });
  };

  render() {
    return this.state.loading ? (
      <LoadingPlaceholder />
    ) : (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this.timeUntilGoalExpires} />
        <View style={styles.sectionWrapper}>
          <Svg width={44} height={57} source={require('../assets/images/unicorn-icon.svg')} />
          <Text style={Typography.screenHeader}>Currently reading</Text>
          <Text style={styles.bookTitle}>{this.state.bookTitle}</Text>
          <Text style={styles.secondaryHeader}>{`${this.state.daysUntilGoalComplete} days left to meet goal`}</Text>
        </View>
        <View style={styles.sectionWrapper}>
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
  },
  sectionWrapper: {
    alignItems: 'center',
    width: '100%',
  },
  ctaButton: {
    ...Button.ctaButton,
    backgroundColor: SCREEN_PRIMARY_COLOR,
  },
  changeGoal: {
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default ActiveBookHomeScreen;
