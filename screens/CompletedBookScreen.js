import React from 'react';
import { Button, Text, View } from 'react-native';
import Svg from 'react-native-svg-uri';

import WrapperScreen from './WrapperScreen';
import { Layout, Typography } from '../styles';

const CompletedBookScreen = ({ bookTitle }) => {
  return (
    <View style={Layout.container}>
      <Text style={Typography.header}>Another one in the books!</Text>
      <Svg height={100} width={100} source={require('../assets/images/checkmark.svg')} />
      <Text>You just finished</Text>
      <Text>{bookTitle}</Text>
      <Button title="Start a new book" onPress={() => {}} />
    </View>
  );
};

export default CompletedBookScreen;
