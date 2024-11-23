import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the bell icon

const MainMenuPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main Menu</Text>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('Options')}
      >
        <Text style={styles.optionText}>Grocery</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => alert('Recipe functionality coming soon!')}
      >
        <Text style={styles.optionText}>Recipe</Text>
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

export default MainMenuPage;
