import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg from 'react-native-svg-uri';

import { Colors, Layout, Typography } from '../styles';

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
        <View style={title ? styles.headerSectionWithTitle : styles.headerSection}>
          <TouchableOpacity style={styles.menu} onPress={this.onMenuTouch}>
            <Svg
              height={30}
              width={25}
              source={
                title
                  ? require('../assets/images/light-hamburger-menu-icon.svg')
                  : require('../assets/images/hamburger-menu-icon.svg')
              }
              fill={Colors.white}
              fillAll={true}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.headerPlaceholder} />
        </View>
        <View style={styles.contentSection}>{children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingRight: '5%',
    paddingLeft: '5%',
    height: '10%',
  },
  headerSectionWithTitle: {
    backgroundColor: Colors.orange,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingRight: '5%',
    paddingLeft: '5%',
    height: '10%',
  },
  headerPlaceholder: {
    width: 30,
  },
  menu: {
    marginBottom: 10,
  },
  title: {
    ...Typography.title,
    color: Colors.white,
  },
  contentSection: {
    paddingRight: '5%',
    paddingLeft: '5%',
    flexDirection: 'column',
    flex: 1,
  },
});

export default WrapperScreen;
