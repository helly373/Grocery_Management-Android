import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { UserContext } from "./UserContext"; 

export const GroceryContext = createContext();

const GroceryProvider = ({ children }) => {
  const [groceries, setGroceries] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const { currentUser } = useContext(UserContext); 

  const GROCERIES_STORAGE_KEY = "groceries";

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

  const addProduct = (newProduct) => {
    const updatedGroceries = [...groceries, newProduct];
    setGroceries(updatedGroceries);
    saveGroceriesToStorage(updatedGroceries); 

    if (currentUser) {
      const message = `Added ${newProduct.name} to your grocery list.`;
      addNotification(message);
    }
  };

  const deleteProduct = (id) => {
    const updatedGroceries = groceries.filter((item) => item.id !== id);
    setGroceries(updatedGroceries);
    saveGroceriesToStorage(updatedGroceries); 

    if (currentUser) {
      const message = `Removed an item from your grocery list.`;
      addNotification(message);
    }
  };


  const addNotification = (message) => {
    if (currentUser) {
      setNotifications((prevNotifications) => [...prevNotifications, message]);

      Toast.show({
        type: "info",
        text1: "Notification",
        text2: message,
        position: "top",
      });
    }
  };

  const checkForExpiringItems = () => {
    if (!currentUser) return; 

    const currentDate = new Date();

    groceries
      .filter((item) => item.expirationDate) 
      .forEach((item) => {
        const expirationDate = new Date(item.expirationDate);
        const diffInDays = Math.ceil(
          (expirationDate - currentDate) / (1000 * 60 * 60 * 24)
        );

        if (diffInDays <= 2 && diffInDays > 0) {
          const message = `Your ${item.name} is about to expire in ${diffInDays} day(s)!`;

          addNotification(message); 
        }
      });
  };

  useEffect(() => {
    loadGroceriesFromStorage();
  }, []);

  useEffect(() => {
    if (currentUser) {
      checkForExpiringItems();
      saveGroceriesToStorage(groceries); 
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
