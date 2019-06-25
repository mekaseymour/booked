import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SplashScreen from '../screens/SplashScreen';
import OnboardingGoalScreen from '../screens/OnboardingGoalScreen';
import InactiveBookHomeScreen from '../screens/InactiveBookHomeScreen';
import ActiveBookHomeScreen from '../screens/ActiveBookHomeScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-information-circle${focused ? '' : '-outline'}` : 'md-information-circle'}
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />,
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

const SplashStack = createStackNavigator({
  Splash: SplashScreen,
  Onboarding: OnboardingGoalScreen,
  InactiveBook: InactiveBookHomeScreen,
  ActiveBook: ActiveBookHomeScreen,
});

SplashStack.navigationOptions = {
  tabBarVisible: false,
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
  SplashStack,
});
