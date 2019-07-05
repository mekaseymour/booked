import React from 'react';
import { createStackNavigator } from 'react-navigation';

import SplashScreen from '../screens/SplashScreen';
import OnboardingGoalScreen from '../screens/OnboardingGoalScreen';
import MainDrawerNavigator from './MainDrawerNavigator';

const SplashStack = createStackNavigator({
  Splash: SplashScreen,
  Onboarding: OnboardingGoalScreen,
  Home: {
    screen: MainDrawerNavigator,
    navigationOptions: {
      header: null,
    },
  },
});

export default SplashStack;
