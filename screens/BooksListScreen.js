import React, { Component } from 'react';
import { AsyncStorage, FlatList, StyleSheet, Text, View } from 'react-native';

class BooksListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: null,
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('pastBooks').then(data => {
      if (data) {
        const parsedBooks = JSON.parse(data);

        const booksForState = parsedBooks.map((book, i) => {
          return { ...JSON.parse(book), key: `book-${i}` };
        });

        this.setState({ books: booksForState });
      }
    });
  }

  render() {
    return !!this.state.books ? (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.state.books}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.listItemHeader}>{item.title}</Text>
            </View>
          )}
        />
      </View>
    ) : (
      <Text>You haven't read any books yet :(</Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  list: {
    width: '100%',
  },
  listItem: {
    height: 50,
  },
  listItemHeader: {
    fontSize: 20,
  },
});

export default BooksListScreen;
