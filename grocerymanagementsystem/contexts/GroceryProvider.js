import React, { createContext, useState } from "react";

// Create the context
export const GroceryContext = createContext();

// Create a provider component
const GroceryProvider = ({ children }) => {
  const [groceries, setGroceries] = useState([
    { id: "1", name: "Apples", quantity: "5 kg", category: "Fruits" },
    { id: "2", name: "Bread", quantity: "1 loaf", category: "Bakery" },
  ]);

  // Function to add a new product
  const addProduct = (newProduct) => {
    setGroceries((prev) => [...prev, newProduct]);
  };

  return (
    <GroceryContext.Provider value={{ groceries, addProduct }}>
      {children}
    </GroceryContext.Provider>
  );
};

export default GroceryProvider;
