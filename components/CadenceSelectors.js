import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CadenceSelector = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.selector} onPress={() => onPress(label)}>
      <Text style={styles.selectorText}>{label}</Text>
    </TouchableOpacity>
  );
};

const CadenceSelectors = ({ onPress }) => {
  const cadences = ['weekly', 'monthly', 'yearly'];

  return (
    <View style={styles.selectorsContainer}>
      {cadences.map(cadence => (
        <CadenceSelector key={`${cadence}-cadence-selector`} label={cadence} onPress={onPress} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  selectorsContainer: {
    alignItems: 'center',
    width: '100%',
  },
  selector: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '65%',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 3,
    marginBottom: 10,
  },
  selectorText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default CadenceSelectors;
