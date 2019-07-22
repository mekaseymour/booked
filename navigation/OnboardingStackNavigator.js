import React from 'react';
import { createStackNavigator } from 'react-navigation';

import SplashScreen from '../screens/SplashScreen';
import SetGoalScreen from '../screens/SetGoalScreen';
import MainDrawerNavigator from './MainDrawerNavigator';

const SplashStack = createStackNavigator({
  Splash: SplashScreen,
  Onboarding: SetGoalScreen,
  Home: {
    screen: MainDrawerNavigator,
    navigationOptions: {
      header: null,
    },
  },
});

export default SplashStack;
