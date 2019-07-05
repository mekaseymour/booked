import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Colors } from '../styles';

class Button extends Component {
  render() {
    const { additionalStyles, text, type } = this.props;

    return (
      <TouchableOpacity>
        <Text>{text}</Text>
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  additionalStyles: PropTypes.object,
  text: PropTypes.string,
  type: PropTypes.oneOf(['circle', 'rounded', 'square']),
};

const defaultButtonStyles = {
  justifyContent: 'center',
  alignItems: 'center',
  height: 65,
  width: '100%',
};

const roundedButtonStyles = {
  borderRadius: 35,
  borderWidth: 3,
  borderColor: Colors.white,
};

const circleButtonStyles = {
  borderRadius: 50,
  borderWidth: 3,
  height: 50,
  borderColor: Colors.white,
};

const squareButtonStyles = {};

const styles = StyleSheet.create({
  button: style => {
    switch (style) {
      case 'circle':
        return { ...defaultButtonStyles, ...circleButtonStyles };
      case 'rounded':
        return { ...defaultButtonStyles, ...roundedButtonStyles };
      case 'square':
        return { ...defaultButtonStyles, ...squareButtonStyles };
      default:
        return {};
    }
  },
});
