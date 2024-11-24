import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For the icons

const MainMenuPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Grocery Button */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate("Options")}
      >
        <Text style={styles.optionText}>Grocery</Text>
      </TouchableOpacity>

      {/* Recipe Button */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => alert("Recipe functionality coming soon!")}
      >
        <Text style={styles.optionText}>Recipe</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate("Welcome")}
      >
        <Text style={styles.logoutText}>Logout</Text>
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
  },
  optionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  logoutButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MainMenuPage;
