import React, { Component } from 'react';
import { AsyncStorage, FlatList, StyleSheet, Text, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Svg from 'react-native-svg-uri';
import { fetchPastBooks } from '../helpers/fetchFromStorage';
import { timeBetweenPastBookStartAndEnd } from '../helpers/lengthOfTimeToFinishBook';

class BooksListScreen extends Component {
  booksWithKeys = () => {
    return this.props.books.map((book, i) => {
      book.key = `book-${i}`;
      return book;
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {!!this.props.books ? (
          <FlatList
            style={styles.list}
            data={this.booksWithKeys().reverse()}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <View style={styles.listIconWrapper}>
                  <Svg height={50} width={50} source={require('../assets/images/muscle-icon.svg')} />
                </View>
                <View>
                  <Text style={styles.listItemHeader}>{item.title}</Text>
                  <Text>{`Finished in ${timeBetweenPastBookStartAndEnd(item)}`}</Text>
                  <Text>{`${item.startDate}-${item.completedDate}`}</Text>
                </View>
              </View>
            )}
          />
        ) : (
          <Text>You haven't read any books yet :(</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexBasis: '100%',
  },
  list: {
    width: '100%',
  },
  listIconWrapper: {
    marginRight: 5,
  },
  listItem: {
    height: 50,
    flexDirection: 'row',
    marginBottom: 20,
  },
  listItemHeader: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default BooksListScreen;
