import React, { useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { GroceryContext } from "../contexts/GroceryProvider";
import { ActivityContext } from "../contexts/ActivityProvider";
import DateTimePicker from "@react-native-community/datetimepicker";

const GroceryList = ({ navigation }) => {
  const { groceries, setGroceries, saveGroceriesToStorage } =
    useContext(GroceryContext);
  const { addActivity } = useContext(ActivityContext);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updatedQuantity, setUpdatedQuantity] = useState(0);
  const [updatedExpirationDate, setUpdatedExpirationDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigateToAddProduct = () => {
    navigation.navigate("AddProduct");
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setUpdatedQuantity(parseInt(item.quantity.replace(/[^0-9]/g, "")));
    setUpdatedExpirationDate(item.expirationDate || "");
    setModalVisible(true);
  };

  const closeEditModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
    setUpdatedQuantity(0);
    setUpdatedExpirationDate("");
  };

  const handleDecreaseQuantity = () => {
    if (updatedQuantity > 1) {
      setUpdatedQuantity((prev) => prev - 1);
    } else {
      alert("Quantity cannot be less than 1");
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setUpdatedExpirationDate(selectedDate.toISOString().split("T")[0]);
    }
  };

  const saveChanges = () => {
    if (updatedQuantity < 1) {
      alert("Quantity cannot be less than 1");
      return;
    }

    const updatedGroceries = groceries.map((item) =>
      item.id === selectedItem.id
        ? {
            ...item,
            quantity: `${updatedQuantity} ${selectedItem.quantity.replace(
              /[0-9\s]/g,
              ""
            )}`,
            expirationDate: updatedExpirationDate,
          }
        : item
    );

    setGroceries(updatedGroceries);
    saveGroceriesToStorage(updatedGroceries);

    // Log activity for changes
    const changes = [];
    if (
      updatedQuantity !== parseInt(selectedItem.quantity.replace(/[^0-9]/g, ""))
    ) {
      changes.push(`quantity updated to ${updatedQuantity}`);
    }
    if (
      updatedExpirationDate &&
      updatedExpirationDate !== selectedItem.expirationDate
    ) {
      changes.push(`expiration date updated to ${updatedExpirationDate}`);
    }

    if (changes.length > 0) {
      addActivity(
        "Item Edited",
        `Edited ${selectedItem.name}: ${changes.join(", ")}`
      );
    }

    closeEditModal();
  };

  const deleteItem = (id) => {
    const deletedItem = groceries.find((item) => item.id === id);
    const updatedGroceries = groceries.filter((item) => item.id !== id);
    setGroceries(updatedGroceries);
    saveGroceriesToStorage(updatedGroceries);

    addActivity("Removed", `Removed ${deletedItem.name}`);
  };

  const renderItem = ({ item }) => {
    const renderLeftActions = () => (
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => openEditModal(item)}
      >
        <Ionicons name="create-outline" size={20} color="white" />
        <Text style={styles.actionText}>Edit</Text>
      </TouchableOpacity>
    );

    const renderRightActions = () => (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteItem(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="white" />
        <Text style={styles.actionText}>Delete</Text>
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
        data={groceries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items in the list</Text>
        }
      />

      {/* Edit Modal */}
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

              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.adjustButton}
                  onPress={handleDecreaseQuantity}
                >
                  <Ionicons
                    name="remove-circle-outline"
                    size={30}
                    color="red"
                  />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{updatedQuantity}</Text>
              </View>

              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowDatePicker(true)}
              >
                <Text>
                  {updatedExpirationDate
                    ? `Expiration Date: ${updatedExpirationDate}`
                    : "Select Expiration Date"}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}

              <View style={styles.modalActions}>
                <Button title="Save" onPress={saveChanges} />
                <Button title="Cancel" color="red" onPress={closeEditModal} />
              </View>
            </View>
          </View>
        </Modal>
      )}

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
    backgroundColor: "#C2B280", // Faded brown background
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#F7F0EF", // Light background for items
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
    color: "#333", // Dark text for item name
  },
  itemCategory: {
    fontSize: 12,
    color: "#888", // Lighter color for category
    marginTop: 2,
  },
  itemQuantity: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333", // Dark text for quantity
    marginLeft: 10,
  },
  itemExpiration: {
    fontSize: 12,
    color: "#888", // Lighter text for expiration date
  },
  noExpiration: {
    fontSize: 12,
    color: "red", // Red text for "No expiration"
  },
  editButton: {
    backgroundColor: "#4caf50", // Green button for edit
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: "100%",
  },
  deleteButton: {
    backgroundColor: "#f44336", // Red button for delete
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: "100%",
  },
  actionText: {
    color: "white", // White text for action buttons
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#999", // Lighter gray for empty text
  },
  addButton: {
    backgroundColor: "#4caf50", // Green button for adding product
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
  },
  addButtonText: {
    color: "#fff", // White text for add button
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Dark background for modal
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%", // Set width for modal content
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  adjustButton: {
    paddingHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
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
