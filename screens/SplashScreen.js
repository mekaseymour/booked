import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SplashScreen = () => {
  return (
    <ImageBackground style={styles.container} source={require('../assets/images/booked-background.jpg')}>
      <View style={styles.headerSection}>
        <Text style={styles.header}>Booked</Text>
        <Text style={styles.subheader}>Let's get reading.</Text>
      </View>
      <TouchableOpacity style={styles.button} onPresee={() => {}}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '30%',
  },
  headerSection: {
    marginTop: 100,
  },
  header: {
    fontSize: 36,
    color: '#4B4B4B',
    fontWeight: '700',
  },
  subheader: {
    fontWeight: '200',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#54A3FF',
    height: 65,
    width: 215,
    borderRadius: 35,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
});

export default SplashScreen;
