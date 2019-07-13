import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg from 'react-native-svg-uri';

import { Layout, Typography } from '../styles';

class WrapperScreen extends Component {
  constructor(props) {
    super(props);
  }

  onMenuTouch = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    const { children, title } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <TouchableOpacity style={styles.menu} onPress={this.onMenuTouch}>
            <Svg height={30} width={30} source={require('../assets/images/hamburger-menu-icon.svg')} />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.headerPlaceholder} />
        </View>
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
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerPlaceholder: {
    width: 30,
  },
  menu: {
    marginBottom: 10,
  },
  title: {
    ...Typography.title,
  },
});

export default WrapperScreen;
