import React from 'react';
import { createDrawerNavigator } from 'react-navigation';

import WrapperScreen from '../screens/WrapperScreen';
import BooksListScreen from '../screens/BooksListScreen';
import BookHomeNavigator from './BookHomeNavigator';

const MainDrawerNavigator = createDrawerNavigator({
  Home: BookHomeNavigator,
  Books: props => (
    <WrapperScreen {...props} title="Completed Books">
      <BooksListScreen {...props} />
    </WrapperScreen>
  ),
});

export default MainDrawerNavigator;
