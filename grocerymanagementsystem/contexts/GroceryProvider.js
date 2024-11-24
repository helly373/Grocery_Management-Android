import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { UserContext } from "./UserContext"; // Import UserContext

export const GroceryContext = createContext();

const GroceryProvider = ({ children }) => {
  const [groceries, setGroceries] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const { currentUser } = useContext(UserContext); // Access the signed-in user

  // AsyncStorage keys
  const GROCERIES_STORAGE_KEY = "groceries";

  // Save groceries to AsyncStorage
  const saveGroceriesToStorage = async (groceries) => {
    try {
      await AsyncStorage.setItem(
        GROCERIES_STORAGE_KEY,
        JSON.stringify(groceries)
      );
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

    if (currentUser) {
      // Add notification if a user is signed in
      const message = `Added ${newProduct.name} to your grocery list.`;
      addNotification(message);
    }
  };

  // Delete a grocery item
  const deleteProduct = (id) => {
    const updatedGroceries = groceries.filter((item) => item.id !== id);
    setGroceries(updatedGroceries);
    saveGroceriesToStorage(updatedGroceries); // Persist the updated list

    if (currentUser) {
      const message = `Removed an item from your grocery list.`;
      addNotification(message);
    }
  };

  // Add a notification if the user is signed in
  const addNotification = (message) => {
    if (currentUser) {
      setNotifications((prevNotifications) => [...prevNotifications, message]);

      // Show toast notification
      Toast.show({
        type: "info",
        text1: "Notification",
        text2: message,
        position: "top",
      });
    }
  };

  // Check for expiring items
  const checkForExpiringItems = () => {
    if (!currentUser) return; // Skip if no user is signed in

    const currentDate = new Date();

    groceries
      .filter((item) => item.expirationDate) // Ensure the item has an expiration date
      .forEach((item) => {
        const expirationDate = new Date(item.expirationDate);
        const diffInDays = Math.ceil(
          (expirationDate - currentDate) / (1000 * 60 * 60 * 24)
        );

        if (diffInDays <= 2 && diffInDays > 0) {
          const message = `Your ${item.name} is about to expire in ${diffInDays} day(s)!`;

          addNotification(message); // Add notification
        }
      });
  };

  // Load groceries on app start
  useEffect(() => {
    loadGroceriesFromStorage();
  }, []);

  // Check for expiring items whenever groceries list changes
  useEffect(() => {
    if (currentUser) {
      checkForExpiringItems();
      saveGroceriesToStorage(groceries); // Persist changes to AsyncStorage
    }
  }, [groceries, currentUser]);

  return (
    <GroceryContext.Provider
      value={{
        groceries,
        setGroceries,
        addProduct,
        deleteProduct,
        notifications,
        setNotifications,
        saveGroceriesToStorage,
      }}
    >
      {children}
    </GroceryContext.Provider>
  );
};

export default GroceryProvider;
