import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import InactiveBookHomeScreenContainer from '../containers/InactiveBookHomeScreenContainer';
import ActiveBookHomeScreenContainer from '../containers/ActiveBookHomeScreenContainer';
import CompletedBookScreen from '../screens/CompletedBookScreen';
import WrapperScreen from '../screens/WrapperScreen';

const configureNavigationScreen = (Screen, props) => {
  return (
    <WrapperScreen {...props}>
      <Screen {...props} />
    </WrapperScreen>
  );
};

// how to change the order based on whether or not there's a current book

const BookHomeNavigator = createSwitchNavigator({
  Inactive: props => configureNavigationScreen(InactiveBookHomeScreenContainer, props),
  Active: props => configureNavigationScreen(ActiveBookHomeScreenContainer, props),
  Complete: props => configureNavigationScreen(CompletedBookScreen, props),
});

export default BookHomeNavigator;
