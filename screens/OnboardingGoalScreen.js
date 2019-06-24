import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '../styles';
import CadenceSelectors from '../components/CadenceSelectors';
import Counter from '../components/Counter';

const cadenceTextMapping = {
  weekly: 'week',
  monthly: 'month',
  yearly: 'year',
};

class OnboardingGoalScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      cadence: null,
      numOfBooks: 0,
    };

    this.onCadenceSelectorPress = this.onCadenceSelectorPress.bind(this);
    this.updateNumberOfBooks = this.updateNumberOfBooks.bind(this);
  }

  onCadenceSelectorPress(cadence) {
    this.setState({ cadence: cadence });
  }

  updateNumberOfBooks(number) {
    this.setState({ numOfBooks: number });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Set a goal.</Text>
        <View>
          <Text style={styles.contentText}>Select cadence of reading goal</Text>
          <CadenceSelectors onPress={this.onCadenceSelectorPress} />
        </View>
        {!!this.state.cadence && (
          <View>
            <Text style={styles.contentText}>{`How many books would you like to complete every ${
              cadenceTextMapping[this.state.cadence]
            }?`}</Text>
            <Counter updateNumber={this.updateNumberOfBooks} />
          </View>
        )}
        {this.state.numOfBooks > 0 && (
          <View style={styles.continueSection}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{`Let's Read -> `}</Text>
            </TouchableOpacity>
            <Text style={styles.note}>You can always adjust your reading goals later</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: Colors.blue,
  },
  headerText: {
    paddingLeft: 40,
    fontSize: 36,
    fontWeight: '700',
    color: 'white',
    marginBottom: 35,
  },
  contentText: {
    paddingLeft: 40,
    fontSize: 18,
    color: 'white',
    marginBottom: 30,
  },
  continueSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
    width: '80%',
    borderRadius: 35,
    borderWidth: 3,
    borderColor: 'white',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
  note: {
    fontSize: 12,
    color: 'white',
    width: 180,
    textAlign: 'center',
  },
});

export default OnboardingGoalScreen;
