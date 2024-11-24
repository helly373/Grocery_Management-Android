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
import { GroceryContext} from "../contexts/GroceryProvider";

const AddProduct = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [expirationDate, setExpirationDate] = useState(""); // New state for expiration date
  const [showDatePicker, setShowDatePicker] = useState(false); // Control for date picker
  const { addProduct } = useContext(GroceryContext);


// Function to handle date change
const handleDateChange = (event, selectedDate) => {
  setShowDatePicker(false); // Close the date picker
  if (selectedDate) {
    setExpirationDate(selectedDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
  }
};  
  // Save the product
const handleSave = () => {
  // Validate name (alphabets only)
  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(name)) {
    Alert.alert("Error", "Product name must only contain alphabets.");
    return;
  }

   // Validate quantity (decimal number + optional unit)
   const quantityRegex = /^[0-9]+(\.[0-9]+)?\s?[A-Za-z]*$/;
   if (!quantityRegex.test(quantity)) {
     Alert.alert(
       "Error",
       "Quantity must be a number with an optional unit (e.g., 5.5 kg, 2 loafs)."
     );
     return;
   }
    // Validate category (only check for non-empty)
    if (!category.trim()) {
      Alert.alert("Error", "Category cannot be empty.");
      return;
    }

    // Validate expiration date
    if (expirationDate) {
      const currentDate = new Date();
      if (new Date(expirationDate) <= currentDate) {
        Alert.alert("Error", "Expiration date must be in the future.");
        return;
      }
    }


    if (!name || !quantity || !category) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    // Create the new product object
    const newProduct = {
      id: Date.now().toString(),
      name,
      quantity,
      category,
      ...(expirationDate && { expirationDate }), // Add expiration date only if it's not empty
  };

   addProduct(newProduct);

  // Clear the input fields
  setName("");
  setQuantity("");
  setCategory("");
  setExpirationDate("");

  // Navigate back to the Grocery List
  navigation.goBack();
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Product</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter product name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter quantity (e.g., 5 kg)"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter category (e.g., Fruits)"
        value={category}
        onChangeText={(text) => setCategory(text)}
      />
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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4caf50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddProduct;
