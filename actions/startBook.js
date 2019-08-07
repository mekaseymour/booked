const startBook = book => dispatch => {
  dispatch({ type: 'START_BOOK', payload: book });
};

export default startBook;
