import { AsyncStorage } from 'react-native';
import getTodaysDateAsLocaleString from '../getTodaysDateAsLocaleString';

const setCurrentBook = (title, completeByGoal) => {
  const bookData = { startDate: getTodaysDateAsLocaleString(), title, completeByGoal };
  const data = JSON.stringify(bookData);

  AsyncStorage.setItem('currentBook', data);
};

export default setCurrentBook;
