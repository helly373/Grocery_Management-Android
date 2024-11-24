import React, { createContext, useState, useEffect } from "react";
import Toast from "react-native-toast-message";

export const GroceryContext = createContext();

const GroceryProvider = ({ children }) => {
  const [groceries, setGroceries] = useState([
    { id: "1", name: "Apples", quantity: "5 kg", category: "Fruits", expirationDate: "2024-11-25" },
    { id: "2", name: "Bread", quantity: "1 loaf", category: "Bakery", expirationDate: "2024-11-24" },
  ]);
  const [notifications, setNotifications] = useState([]); 


  const addProduct = (newProduct) => {
    setGroceries((prev) => [...prev, newProduct]);
  };


  const checkForExpiringItems = () => {
    const currentDate = new Date();

    // if (currentPage === "SignIn" || currentPage === "SignUp") {
    //   return; // Do not trigger notifications on Sign-In or Sign-Up pages
    // }

  
    const expiringNotifications = groceries
      .filter((item) => item.expirationDate) 
      .map((item) => {
        const expirationDate = new Date(item.expirationDate);
        const diffInDays = Math.ceil(
          (expirationDate - currentDate) / (1000 * 60 * 60 * 24)
        );

        if (diffInDays <= 2 && diffInDays > 0) {
          const notificationMessage = `Your ${item.name} is about to expire in ${diffInDays} day(s)!`;

          // Trigger Toast Notification
          Toast.show({
            type: "info",
            text1: "Expiration Reminder", // Title
            text2: notificationMessage, // Message
            position: "top", // Position of the notification
          });

          return notificationMessage;
        }
        return null;
      })
      .filter((notification) => notification !== null); 

    // Update the notifications state
    setNotifications(expiringNotifications);
  };

  // Check for expiring items whenever the groceries list changes
  useEffect(() => {
    checkForExpiringItems();
  }, [groceries]);

  return (
    <GroceryContext.Provider
      value={{ groceries,setGroceries, addProduct, notifications, setNotifications }}
    >
      {children}
    </GroceryContext.Provider>
  );
};

export default GroceryProvider;


