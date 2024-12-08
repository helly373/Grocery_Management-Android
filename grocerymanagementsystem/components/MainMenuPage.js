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
        <Ionicons
          name="cart-outline"
          size={24}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.optionText}>Grocery</Text>
      </TouchableOpacity>

      {/* Recipe Button */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => alert("Recipe functionality coming soon!")}
      >
        <Ionicons
          name="book-outline"
          size={24}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.optionText}>Recipe</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate("Welcome")}
      >
        <Ionicons
          name="log-out-outline"
          size={24}
          color="white"
          style={styles.icon}
        />
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
    backgroundColor: "#C2B280", // Faded brown background
  },
  optionButton: {
    backgroundColor: "#32CD32", // Green background for option buttons
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 12,
    width: "80%",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "center",
  },
  optionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 8, // Space between icon and text
  },
  icon: {
    marginRight: 8, // Space between icon and text
  },
  logoutButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#f44336", // Red background for logout button
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8, // Space between icon and text
  },
});

export default MainMenuPage;
