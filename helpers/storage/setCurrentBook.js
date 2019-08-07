import { AsyncStorage } from 'react-native';
import getTodaysDateAsLocaleString from '../getTodaysDateAsLocaleString';

const setCurrentBook = data => {
  const bookData = JSON.stringify(data);

  AsyncStorage.setItem('currentBook', bookData);
};

export default setCurrentBook;
