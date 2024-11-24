import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const OptionsPage = ({ navigation, addProduct }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grocery</Text>
      
      {/* Checklist Button */}
      <TouchableOpacity
        style={styles.optionButton} // Style for the Checklist button
        onPress={() => navigation.navigate('GroceryList')}
      >
        <Text style={styles.optionText}>Checklist</Text>
      </TouchableOpacity>

      {/* Add Grocery Button */}
      <TouchableOpacity
        style={styles.addGroceryButton} // Specific style for Add Grocery button
        onPress={() => navigation.navigate('AddProduct', { addProduct })}
      >
        <Text style={styles.addGroceryText}>Add Grocery</Text>
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
    backgroundColor: '#f5f5f5', // Light gray background for Checklist button
    padding: 16,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addGroceryButton: {
    backgroundColor: 'black', // Black background for Add Grocery button
    padding: 16,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addGroceryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // White text for Add Grocery button
  },
});

export default OptionsPage;
