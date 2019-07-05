import { AsyncStorage } from 'react-native';

import addBookToPastReadList from './storage/addBookToPastReadList';

/*

Shape of 'goal' from AsyncStorage should be

{"cadence":"weekly","numOfBooks":1,"completeBy":"7/9/2019","book":"Oh the Places You'll Go"}

*/

const completeBook = () => {
  AsyncStorage.getItem('goal')
    .then(data => {
      const parsedData = JSON.parse(data);

      addBookToPastReadList(parsedData.book);
    })
    .catch(err => console.log(err));
};

export default completeBook;
