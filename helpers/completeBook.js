import { AsyncStorage } from 'react-native';

import addBookToPastReadList from './storage/addBookToPastReadList';
import getTodaysDateAsLocaleString from './getTodaysDateAsLocaleString';

const giveBookCompletedDate = book => {
  const parsedBook = JSON.parse(book);

  parsedBook.completedDate = getTodaysDateAsLocaleString();
  return JSON.stringify(parsedBook);
};

const completeBook = () => {
  AsyncStorage.getItem('currentBook')
    .then(data => {
      const completedBook = giveBookCompletedDate(data);
      addBookToPastReadList(completedBook);
    })
    .catch(err => console.log(err));

  return AsyncStorage.removeItem('currentBook');
};

export default completeBook;
