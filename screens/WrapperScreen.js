import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg from 'react-native-svg-uri';

import { Layout } from '../styles';

class WrapperScreen extends Component {
  constructor(props) {
    super(props);
  }

  onMenuTouch = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    const { children } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.menu} onPress={this.onMenuTouch}>
          <Svg height={30} width={30} source={require('../assets/images/hamburger-menu-icon.svg')} />
        </TouchableOpacity>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    marginBottom: '10%',
    marginRight: '5%',
    marginLeft: '5%',
  },
  menu: {
    marginBottom: 10,
  },
});

export default WrapperScreen;
