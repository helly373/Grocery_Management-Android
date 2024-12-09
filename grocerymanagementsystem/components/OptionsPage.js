import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For the icons

const OptionsPage = ({ navigation, addProduct }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grocery</Text>

      {/* Checklist Button */}
      <TouchableOpacity
        style={styles.optionButton} // Style for the Checklist button
        onPress={() => navigation.navigate("GroceryList")}
      >
        <Ionicons
          name="list-outline"
          size={24}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.optionText}>Checklist</Text>
      </TouchableOpacity>

      {/* Add Grocery Button */}
      <TouchableOpacity
        style={styles.addGroceryButton} // Specific style for Add Grocery button
        onPress={() => navigation.navigate("AddProduct", { addProduct })}
      >
        <Ionicons
          name="add-circle-outline"
          size={24}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.addGroceryText}>Add Grocery</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#C2B280", 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333", 
  },
  optionButton: {
    backgroundColor: "black", 
    padding: 16,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc", 
    flexDirection: "row",
    justifyContent: "center",
  },
  optionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white", 
    marginLeft: 8, 
  },
  icon: {
    marginRight: 8, 
  },
  addGroceryButton: {
    backgroundColor: "#32CD32", 
    padding: 16,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "center",
  },
  addGroceryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white", 
    marginLeft: 8, 
  },
});

export default OptionsPage;
