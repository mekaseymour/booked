import React from 'react';
import { AsyncStorage } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';

import ActiveBookHomeScreen from '../screens/ActiveBookHomeScreen';
import InactiveBookHomeScreen from '../screens/InactiveBookHomeScreen';
import BookHomeScreen from '../screens/BookHomeScreen';

const userIsCurrentlyReadingABook = async () => {
  return await AsyncStorage.getItem('currentBook');
};

const MainDrawerNavigator = createDrawerNavigator({
  Home: BookHomeScreen,
});

export default MainDrawerNavigator;
