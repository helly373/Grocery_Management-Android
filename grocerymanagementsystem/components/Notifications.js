import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { GroceryContext } from "../contexts/GroceryProvider";
import { UserContext } from "../contexts/UserContext";

const Notifications = () => {
  const { notifications } = useContext(GroceryContext);
  const { currentUser } = useContext(UserContext);

  // Ensure notifications are shown only if a user is signed in
  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Please sign in to view notifications.</Text>
      </View>
    );
  }

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
    backgroundColor: "#87CEEB", // Blue background for notification bubble
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
  boldText: {
    fontWeight: "bold", // Bold style for specific part of the text
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
