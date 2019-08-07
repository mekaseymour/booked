import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg from 'react-native-svg-uri';

import { Button, Colors, Input, Typography } from '../styles';
import getCompleteByDate from '../helpers/getCompleteByDate';
import setCurrentBook from '../helpers/storage/setCurrentBook';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import { textInputIsValid } from '../util/validation';
import getTodaysDateAsLocaleString from '../helpers/getTodaysDateAsLocaleString';

const SCREEN_PRIMARY_COLOR = Colors.purple;

class InactiveBookHomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      bookNameInput: null,
      numOfPagesInput: null,
      loading: true,
    };

    this.onBookNameInputChange = this.onBookNameInputChange.bind(this);
  }

  componentWillMount() {
    AsyncStorage.getItem('currentBook').then(data => {
      if (data) {
        this.props.navigation.navigate('Active');
      } else {
        this.setState({ loading: false });
      }
    });
  }

  onBookNameInputChange(text) {
    this.setState({ bookNameInput: text });
  }

  onNumOfPagesChanges = input => {
    this.setState({ numOfPagesInput: input });
  };

  activateBook = () => {
    if (this.state.bookNameInput && textInputIsValid(this.state.bookNameInput)) {
      getCompleteByDate()
        .then(data => {
          const bookData = {
            startDate: getTodaysDateAsLocaleString(),
            title: this.state.bookNameInput,
            completeByGoal: data,
            pages: this.state.numOfPagesInput,
          };

          this.props.startBook(bookData);
        })
        .then(() => this.props.navigation.navigate('Active'));
    } else {
      alert('please enter a book title');
    }
  };

  render() {
    return this.state.loading ? (
      <LoadingPlaceholder />
    ) : (
      <View style={styles.container}>
        <View style={styles.sectionWrapper}>
          <View style={styles.iconWrapper}>
            <Svg height={76} width={80} source={require('../assets/images/dragon-icon.svg')} />
          </View>
          <Text style={styles.subHeader}>You are not currently reading anything</Text>
          <Text style={styles.header}>What book will you be reading?</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.onBookNameInputChange(text)}
            value={this.state.bookNameInput}
            autoCapitalize="words"
            placeholder="book title"
            placeholderTextColor={Colors.gray}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={input => this.onNumOfPagesChanges(input)}
            value={this.state.numOfPagesInput}
            keyboardType="numeric"
            placeholder="number of pages"
            placeholderTextColor={Colors.gray}
          />
        </View>
        <View style={styles.sectionWrapper}>
          <TouchableOpacity style={styles.button} onPress={this.activateBook}>
            <Text style={Typography.buttonText}>Start book</Text>
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
  header: {
    ...Typography.screenHeader,
    color: SCREEN_PRIMARY_COLOR,
    textAlign: 'center',
    marginTop: 15,
  },
  subHeader: {
    ...Typography.subHeader,
    color: Colors.darkGray,
  },
  button: {
    ...Button.ctaButton,
    backgroundColor: SCREEN_PRIMARY_COLOR,
  },
  iconWrapper: {
    marginBottom: 25,
  },
  sectionWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  textInput: {
    ...Input.mainInput,
    borderColor: Colors.gray,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default InactiveBookHomeScreen;
