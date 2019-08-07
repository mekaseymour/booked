import { connect } from 'react-redux';
import ActiveBookHomeScreen from '../screens/ActiveBookHomeScreen';

import completeBook from '../actions/completeBook';

const mapStateToProps = state => {
  console.log('state', state);

  return {
    book: state.currentBook,
  };
};

const mapDispatchToProps = dispatch => ({
  finishBook: () => dispatch(completeBook()),
});

const ActiveBookHomeScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveBookHomeScreen);

export default ActiveBookHomeScreenContainer;
