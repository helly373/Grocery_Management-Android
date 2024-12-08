import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select"; // Import dropdown library
import { GroceryContext } from "../contexts/GroceryProvider";
import { ActivityContext } from "../contexts/ActivityProvider";

const AddProduct = ({ navigation }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { addProduct } = useContext(GroceryContext);
  const { addActivity } = useContext(ActivityContext);

  const categories = [
    { label: "Fruits", value: "Fruits" },
    { label: "Vegetables", value: "Vegetables" },
    { label: "Bakery", value: "Bakery" },
    { label: "Dairy", value: "Dairy" },
    { label: "Meat", value: "Meat" },
    { label: "Beverages", value: "Beverages" },
    { label: "Snacks", value: "Snacks" },
    { label: "Others", value: "Others" },
  ];

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setExpirationDate(selectedDate.toISOString().split("T")[0]);
    }
  };

  const handleSave = () => {
    if (!name.trim() || !quantity.trim() || !category.trim()) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name,
      quantity,
      category,
      ...(expirationDate && { expirationDate }),
    };

    addProduct(newProduct);
    addActivity("Added", `Added ${name} (${quantity}) to ${category}`);
    setName("");
    setQuantity("");
    setCategory("");
    setExpirationDate("");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Product</Text>

      {/* Product Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter product name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      {/* Quantity Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter quantity (e.g., 5 kg)"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
      />

      {/* Category Dropdown */}
      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          placeholder={{
            label: "Select Category",
            value: null,
            color: "#9EA0A4",
          }}
          onValueChange={(value) => setCategory(value)}
          items={categories}
          style={{
            inputAndroid: styles.dropdownInput,
            inputIOS: styles.dropdownInput,
          }}
          value={category}
        />
      </View>

      {/* Expiration Date Picker */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>
          {expirationDate
            ? `Expiration Date: ${expirationDate}`
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

      {/* Save Button */}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333", // Dark text for the title
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fff", // White background for inputs
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
    padding: 4,
    backgroundColor: "#fff", // White background for dropdown container
  },
  dropdownInput: {
    fontSize: 16,
    padding: 10,
    color: "#333", // Dark text for dropdown
  },
  button: {
    backgroundColor: "#4caf50", // Green background for save button
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff", // White text for save button
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddProduct;
