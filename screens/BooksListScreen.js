import React, { Component } from 'react';
import { AsyncStorage, FlatList, StyleSheet, Text, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Svg from 'react-native-svg-uri';

class BooksListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: null,
    };
  }

  componentWillMount() {
    this.fetchBooksFromStorage();
  }

  fetchBooksFromStorage = () => {
    AsyncStorage.getItem('pastBooks').then(data => {
      if (data) {
        const parsedBooks = JSON.parse(data);

        const booksForState = parsedBooks.map((book, i) => {
          return { ...JSON.parse(book), key: `book-${i}` };
        });

        this.setState({ books: booksForState });
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this.fetchBooksFromStorage} />
        {!!this.state.books ? (
          <FlatList
            style={styles.list}
            data={this.state.books}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <View style={styles.listIconWrapper}>
                  <Svg height={35} width={35} source={require('../assets/images/single-book-icon.svg')} />
                </View>
                <View>
                  <Text style={styles.listItemHeader}>{item.title}</Text>
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
  },
  listItemHeader: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default BooksListScreen;
