import { AsyncStorage } from 'react-native';

const fetchCurrentBook = async () => {
  const data = await AsyncStorage.getItem('currentBook');
  return JSON.parse(data);
};

const fetchPastBooks = async () => {
  const data = await AsyncStorage.getItem('pastBooks');
  return JSON.parse(data);
};

export { fetchCurrentBook, fetchPastBooks };
