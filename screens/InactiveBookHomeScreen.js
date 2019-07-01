import React, { Component } from 'react';
import { AsyncStorage, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Colors } from '../styles';
import setCompleteByDate from '../helpers/setCompleteByDate';

class InactiveBookHomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      bookNameInput: null,
    };

    this.onBookNameInputChange = this.onBookNameInputChange.bind(this);
    this.activateBook = this.activateBook.bind(this);
  }

  onBookNameInputChange(text) {
    this.setState({ bookNameInput: text });
  }

  titleIsNotEmptyString(title) {
    for (let i = 0; i < title.length; i++) {
      if (title[i] !== ' ') return true;
    }

    return false;
  }

  activateBook() {
    if (this.state.bookNameInput && this.titleIsNotEmptyString(this.state.bookNameInput)) {
      AsyncStorage.getItem('goal').then(data => {
        const goalData = JSON.parse(data);
        const goalWithCompleteByDate = setCompleteByDate(goalData);

        goalWithCompleteByDate.book = this.state.bookNameInput;

        console.log('goal', JSON.stringify(goalWithCompleteByDate));

        AsyncStorage.setItem('goal', JSON.stringify(goalWithCompleteByDate));

        this.props.navigation.navigate('ActiveBook');
      });
    } else {
      alert('please enter a book title');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.icon} source={require('../assets/images/book-icon.png')} />
        <Text style={styles.subheader}>You are not currently reading anything</Text>
        <Text style={styles.header}>What book will you be reading next?</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.onBookNameInputChange(text)}
          value={this.state.bookNameInput}
        />
        <View style={styles.inputSection}>
          <Text style={styles.inputHint}>enter book title</Text>
          <TouchableOpacity style={styles.button} onPress={this.activateBook}>
            <Text style={styles.buttonText}>Start reading</Text>
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
    paddingTop: '25%',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  header: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.blue,
    textAlign: 'left',
    width: '100%',
    marginTop: 15,
  },
  subheader: {
    fontSize: 14,
    color: Colors.darkGray,
    textAlign: 'left',
    width: '100%',
  },
  button: {
    backgroundColor: Colors.blue,
    height: 65,
    width: '80%',
    borderRadius: 30,
    marginTop: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  icon: {
    height: 65,
    width: 65,
    marginBottom: 25,
  },
  inputSection: {
    width: '90%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    textAlign: 'left',
    height: 45,
    borderBottomWidth: 3,
    borderBottomColor: Colors.blue,
  },
  inputHint: {
    marginTop: 10,
    color: Colors.blue,
    fontSize: 12,
    textAlign: 'left',
    width: '100%',
  },
});

export default InactiveBookHomeScreen;
