import { combineReducers } from 'redux';
import currentBook from './currentBook';
import pastBooks from './pastBooks';

export default combineReducers({
  currentBook: currentBook,
  pastBooks: pastBooks,
});
