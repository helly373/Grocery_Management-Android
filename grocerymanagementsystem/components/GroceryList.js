import React, { useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GroceryContext } from "../contexts/GroceryProvider";

const GroceryList = ({ navigation }) => {
  const { groceries, addProduct } = useContext(GroceryContext);

  const deleteItem = (id) => {
    setGroceries((prev) => prev.filter((item) => item.id !== id));
  };


  const navigateToAddProduct = () => {
    navigation.navigate("AddProduct");
  };

  const renderItem = ({ item }) => {
    const renderLeftActions = () => (
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => alert("Edit Item")}
      >
        <Ionicons name="create-outline" size={20} color="white" />
      </TouchableOpacity>
    );

    const renderRightActions = () => (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteItem(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="white" />
      </TouchableOpacity>
    );

    return (
      <Swipeable
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
      >
        <View style={styles.itemContainer}>
          <Ionicons
            name="fast-food-outline"
            size={24}
            color="#666"
            style={{ marginRight: 10 }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCategory}>{item.category}</Text>
          </View>
          <Text style={styles.itemQuantity}>{item.quantity}</Text>
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={groceries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items in the list</Text>
        }
      />

      {/* Add Product Button */}
      <TouchableOpacity style={styles.addButton} onPress={navigateToAddProduct}>
        <Text style={styles.addButtonText}>+ Add Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  textContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemCategory: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  itemQuantity: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: "#4caf50",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: "100%",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: "100%",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#999",
  },
  addButton: {
    backgroundColor: "#4caf50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GroceryList;
