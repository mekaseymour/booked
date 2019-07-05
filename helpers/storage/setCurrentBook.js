import { AsyncStorage } from 'react-native';

const setCurrentBook = (title, completeByGoal) => {
  const bookData = { title, completeByGoal };
  const data = JSON.stringify(bookData);

  AsyncStorage.setItem('currentBook', data);
};

export default setCurrentBook;
