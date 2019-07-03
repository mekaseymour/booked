import { AsyncStorage } from 'react-native';

import addBookToPastReadList from './storage/addBookToPastReadList';

const completeBook = () => {
  AsyncStorage.getItem('currentBook')
    .then(data => {
      addBookToPastReadList(data);
    })
    .catch(err => console.log(err));

  AsyncStorage.removeItem('currentBook');
};

export default completeBook;
