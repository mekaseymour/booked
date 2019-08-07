import { connect } from 'react-redux';

import InactiveBookHomeScreen from '../screens/InactiveBookHomeScreen';
import startBook from '../actions/startBook';

const mapStateToProps = state => ({
  currentBookExists: state.currentBook && state.currentBook.title,
});

const mapDispatchToProps = dispatch => ({
  startBook: book => dispatch(startBook(book)),
});

const InactiveBookHomeScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InactiveBookHomeScreen);

export default InactiveBookHomeScreenContainer;
