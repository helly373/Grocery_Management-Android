import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export const GroceryContext = createContext();

const GroceryProvider = ({ children }) => {
  const [groceries, setGroceries] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // AsyncStorage keys
  const GROCERIES_STORAGE_KEY = "groceries";

  // Save groceries to AsyncStorage
  const saveGroceriesToStorage = async (groceries) => {
    try {
      await AsyncStorage.setItem(GROCERIES_STORAGE_KEY, JSON.stringify(groceries));
    } catch (error) {
      console.error("Error saving groceries to AsyncStorage:", error);
    }
  };

  // Load groceries from AsyncStorage
  const loadGroceriesFromStorage = async () => {
    try {
      const storedGroceries = await AsyncStorage.getItem(GROCERIES_STORAGE_KEY);
      if (storedGroceries) {
        setGroceries(JSON.parse(storedGroceries));
      }
    } catch (error) {
      console.error("Error loading groceries from AsyncStorage:", error);
    }
  };

  // Add a grocery item
  const addProduct = (newProduct) => {
    const updatedGroceries = [...groceries, newProduct];
    setGroceries(updatedGroceries);
    saveGroceriesToStorage(updatedGroceries); // Persist the updated list
  };

  // Delete a grocery item
  const deleteProduct = (id) => {
    const updatedGroceries = groceries.filter((item) => item.id !== id);
    setGroceries(updatedGroceries);
    saveGroceriesToStorage(updatedGroceries); // Persist the updated list
  };

  // Check for expiring items
  const checkForExpiringItems = () => {
    const currentDate = new Date();

    const expiringNotifications = groceries
      .filter((item) => item.expirationDate) // Ensure the item has an expiration date
      .map((item) => {
        const expirationDate = new Date(item.expirationDate);
        const diffInDays = Math.ceil((expirationDate - currentDate) / (1000 * 60 * 60 * 24));

        if (diffInDays <= 2 && diffInDays > 0) {
          const notificationMessage = `Your ${item.name} is about to expire in ${diffInDays} day(s)!`;

          // Trigger Toast Notification
          Toast.show({
            type: "info",
            text1: "Expiration Reminder",
            text2: notificationMessage,
            position: "top",
          });

          return notificationMessage;
        }
        return null;
      })
      .filter((notification) => notification !== null); // Filter out null values

    // Update the notifications state
    setNotifications(expiringNotifications);
  };

  // Load groceries on app start
  useEffect(() => {
    loadGroceriesFromStorage();
  }, []);

  // Check for expiring items whenever groceries list changes
  useEffect(() => {
    checkForExpiringItems();
    saveGroceriesToStorage(groceries); // Persist changes to AsyncStorage
  }, [groceries]);

  return (
    <GroceryContext.Provider
      value={{ groceries, setGroceries, addProduct, deleteProduct, notifications, setNotifications, saveGroceriesToStorage }}
    >
      {children}
    </GroceryContext.Provider>
  );
};

export default GroceryProvider;