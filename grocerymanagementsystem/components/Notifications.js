import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { GroceryContext } from "../contexts/GroceryProvider";

const Notifications = () => {
  const { notifications } = useContext(GroceryContext);

  return (
    <View style={styles.container}>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.notificationItem}>
              <Text style={styles.notificationText}>{item}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.text}>No notifications</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  notificationItem: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  notificationText: {
    fontSize: 16,
    color: "#333",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});

export default Notifications;
