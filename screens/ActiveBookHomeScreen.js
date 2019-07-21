import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
          <TouchableOpacity style={styles.ctaButton} onPress={this.finishBook}>
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

// const userIsBehindOnReadingGoal = this.state.daysUntilGoalComplete < 0;
//
// return this.state.loading ? (
//   <LoadingPlaceholder />
// ) : (
//   <View style={styles.container}>
//     <NavigationEvents onWillFocus={this.timeUntilGoalExpires} />
//     <Text>{userIsBehindOnReadingGoal ? `You're behind on your goal!` : `You're on track!`}</Text>
//     <View style={styles.goalNoticeSection}>
//       {userIsBehindOnReadingGoal ? (
//         <Text>{`You are ${Math.abs(this.state.daysUntilGoalComplete)} behind on completing`}</Text>
//       ) : (
//         <View>
//           <Text style={styles.headerText}>You have</Text>
//           <Text style={styles.mainContentText}>{`${this.state.daysUntilGoalComplete} days`}</Text>
//           <Text style={styles.headerText}>to complete</Text>
//         </View>
//       )}
//     </View>
//     <Text style={styles.bookTitle}>{this.state.bookTitle}</Text>
//     <View style={styles.buttonSection}>
//       <TouchableOpacity style={styles.markCompleteButton} onPress={this.finishBook}>
//         <Text style={styles.markCompleteButtonText}>Mark as completed</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => this.props.navigation.navigate('Onboarding')}>
//         <Text style={styles.changeGoal}>change goal</Text>
//       </TouchableOpacity>
//     </View>
//   </View>
// );

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
