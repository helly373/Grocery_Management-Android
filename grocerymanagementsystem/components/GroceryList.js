import React, { useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GroceryContext } from "../contexts/GroceryProvider";

const GroceryList = ({ navigation }) => {
  const { groceries, setGroceries, saveGroceriesToStorage } = useContext(GroceryContext);

  const navigateToAddProduct = () => {
    navigation.navigate("AddProduct");
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updatedQuantity, setUpdatedQuantity] = useState("");
  const [updatedExpirationDate, setUpdatedExpirationDate] = useState("");

    // Sort groceries by soonest expiration date
    const sortedGroceries = groceries
    .slice() 
    .sort((a, b) => {
      if (!a.expirationDate) return 1; 
      if (!b.expirationDate) return -1;
      return new Date(a.expirationDate) - new Date(b.expirationDate);
    });

  // Delete a grocery item
  const deleteItem = (id) => {
    const updatedGroceries = groceries.filter((item) => item.id !== id);
    setGroceries(updatedGroceries);
    saveGroceriesToStorage(updatedGroceries); // Persist updated list to AsyncStorage
  };

  // Open the modal for editing
  const openEditModal = (item) => {
    setSelectedItem(item);
    setUpdatedQuantity(item.quantity);
    setUpdatedExpirationDate(item.expirationDate || "");
    setModalVisible(true);
  };

  // Close the edit modal
  const closeEditModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
    setUpdatedQuantity("");
    setUpdatedExpirationDate("");
  };

  // Save changes made in the modal
  const saveChanges = () => {
    if (!updatedQuantity.trim()) {
      alert("Quantity cannot be empty");
      return;
    }

    const updatedGroceries = groceries.map((item) =>
      item.id === selectedItem.id
        ? {
            ...item,
            quantity: updatedQuantity,
            expirationDate: updatedExpirationDate,
          }
        : item
    );

    setGroceries(updatedGroceries);
    saveGroceriesToStorage(updatedGroceries); // Persist updated list to AsyncStorage
    closeEditModal();
  };

  const renderItem = ({ item }) => {
    const renderLeftActions = () => (
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => openEditModal(item)}
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
            {item.expirationDate ? (
              <Text style={styles.itemExpiration}>
                Exp: {item.expirationDate}
              </Text>
            ) : (
              <Text style={styles.noExpiration}>No Expiration Date</Text>
            )}
          </View>
          <Text style={styles.itemQuantity}>{item.quantity}</Text>
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedGroceries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items in the list</Text>
        }
      />

      {/* Modal for Editing */}
      {selectedItem && (
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeEditModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Item</Text>
              <TextInput
                style={styles.input}
                placeholder="Quantity (e.g., 5 kg)"
                value={updatedQuantity}
                onChangeText={setUpdatedQuantity}
              />
              <TextInput
                style={styles.input}
                placeholder="Expiration Date (YYYY-MM-DD)"
                value={updatedExpirationDate}
                onChangeText={setUpdatedExpirationDate}
              />
              <View style={styles.modalActions}>
                <Button title="Save" onPress={saveChanges} />
                <Button title="Cancel" color="red" onPress={closeEditModal} />
              </View>
            </View>
          </View>
        </Modal>
      )}

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
    backgroundColor: "#F7F0EF",
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
  itemExpiration: {
    fontSize: 12,
    color: "#888",
  },
  noExpiration: {
    fontSize: 12,
    color: "red",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default GroceryList;
