import React from 'react';
import { createDrawerNavigator } from 'react-navigation';

import WrapperScreen from '../screens/WrapperScreen';
import BooksListScreenContainer from '../containers/BooksListScreenContainer';
import BookHomeNavigator from './BookHomeNavigator';

const MainDrawerNavigator = createDrawerNavigator({
  Home: BookHomeNavigator,
  Books: props => (
    <WrapperScreen {...props} title="Completed Books">
      <BooksListScreenContainer {...props} />
    </WrapperScreen>
  ),
});

export default MainDrawerNavigator;
