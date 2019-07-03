import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

import ActiveBookHomeScreen from './ActiveBookHomeScreen';
import InactiveBookHomeScreen from './InactiveBookHomeScreen';

class BookHomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userHasCurrentBook: null,
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('currentBook').then(data => {
      if (data) {
        this.setState({ userHasCurrentBook: true });
      }
    });
  }

  showActiveBook = () => {
    this.setState({ userHasCurrentBook: true });
  };

  showInactiveBook = () => {
    this.setState({ userHasCurrentBook: false });
  };

  render() {
    return this.state.userHasCurrentBook ? (
      <ActiveBookHomeScreen onBookComplete={this.showInactiveBook} />
    ) : (
      <InactiveBookHomeScreen onBookStart={this.showActiveBook} />
    );
  }
}

export default BookHomeScreen;
