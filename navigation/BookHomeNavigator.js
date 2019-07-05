import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import InactiveBookHomeScreen from '../screens/InactiveBookHomeScreen';
import ActiveBookHomeScreen from '../screens/ActiveBookHomeScreen';
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
  Inactive: props => configureNavigationScreen(InactiveBookHomeScreen, props),
  Active: props => configureNavigationScreen(ActiveBookHomeScreen, props),
  Complete: props => configureNavigationScreen(CompletedBookScreen, props),
});

export default BookHomeNavigator;
