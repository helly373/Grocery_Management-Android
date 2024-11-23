import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const OptionsPage = ({ navigation, addProduct }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grocery</Text>
      
      {/* Button to navigate to the Checklist */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('GroceryList')}
      >
        <Text style={styles.optionText}>Checklist</Text>
      </TouchableOpacity>

      {/* Button to navigate to Add Grocery */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('AddProduct', {addProduct})}
      >
        <Text style={styles.optionText}>Add Grocery</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  optionButton: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OptionsPage;
