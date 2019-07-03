import { AsyncStorage } from 'react-native';

const addBookToPastReadList = book => {
  AsyncStorage.getItem('pastBooks')
    .then(data => {
      if (data) {
        const books = JSON.parse(data);
        books.push(book);

        AsyncStorage.setItem('pastBooks', JSON.stringify(books)).catch(err => console.log(err));
      } else {
        AsyncStorage.setItem('pastBooks', JSON.stringify([book])).catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
};

export default addBookToPastReadList;
