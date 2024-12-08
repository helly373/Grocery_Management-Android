import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ActivityContext } from "../contexts/ActivityProvider";

const ActivityPage = () => {
  const { activities } = useContext(ActivityContext);
  const [filter, setFilter] = useState("All"); // Filters: All, Added, Removed, etc.

  // Filter activities based on category
  const filteredActivities =
    filter === "All"
      ? activities
      : activities.filter((activity) => activity.actionType === filter);

  // Render individual activity item
  const renderActivity = ({ item }) => (
    <View style={styles.activityItem}>
      <Text style={styles.activityType}>{item.actionType}</Text>
      <Text style={styles.activityDetails}>{item.details}</Text>
      <Text style={styles.activityTimestamp}>
        {new Date(item.timestamp).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Filters */}
      <View style={styles.filterContainer}>
        {["All", "Added", "Removed", "Item Edited"].map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              filter === category && styles.activeFilter,
            ]}
            onPress={() => setFilter(category)}
          >
            <Text
              style={[
                styles.filterText,
                filter === category && styles.activeFilterText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Activity List */}
      <FlatList
        data={filteredActivities}
        keyExtractor={(item) => item.id}
        renderItem={renderActivity}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No activities to show.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#C2B280", // Faded brown background
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  filterButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  activeFilter: {
    backgroundColor: "#4caf50", // Green background for active filter
  },
  filterText: {
    color: "#333", // Dark text color for filter options
  },
  activeFilterText: {
    color: "#fff", // White text for active filter
    fontWeight: "bold",
  },
  activityItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#F7F0EF", // Light background for activity item
  },
  activityType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333", // Dark text for activity type
  },
  activityDetails: {
    fontSize: 14,
    color: "#666", // Lighter gray for activity details
    marginVertical: 4,
  },
  activityTimestamp: {
    fontSize: 12,
    color: "#888", // Lighter gray for timestamp
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999", // Lighter gray for "No activities" text
  },
});

export default ActivityPage;
