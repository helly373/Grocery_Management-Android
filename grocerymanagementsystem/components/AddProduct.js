import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { GroceryContext} from "../contexts/GroceryProvider";

const AddProduct = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const { addProduct } = useContext(GroceryContext);

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
  };

   addProduct(newProduct);

  // Clear the input fields
  setName("");
  setQuantity("");
  setCategory("");

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
