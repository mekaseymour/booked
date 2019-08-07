import completeBookInStorage from '../helpers/completeBook';

const completeBook = () => dispatch => {
  completeBookInStorage().then(() => dispatch({ type: 'COMPLETE_BOOK' }));
};

export default completeBook;
