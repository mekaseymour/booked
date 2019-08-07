import { connect } from 'react-redux';

import BooksListScreen from '../screens/BooksListScreen';

const mapStateToProps = state => ({
  books: state.pastBooks,
});

const BooksListScreenContainer = connect(mapStateToProps)(BooksListScreen);

export default BooksListScreenContainer;
