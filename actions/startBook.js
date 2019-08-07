import setCurrentBook from '../helpers/storage/setCurrentBook';

const startBook = book => dispatch => {
  dispatch({ type: 'START_BOOK', payload: book });
  setCurrentBook(book);
};

export default startBook;
