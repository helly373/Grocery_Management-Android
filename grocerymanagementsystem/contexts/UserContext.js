import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState({});
  const [currentUser, setCurrentUser] = useState(null); 
  const saveUsersToStorage = async (users) => {
    try {
      await AsyncStorage.setItem("users", JSON.stringify(users));
    } catch (error) {
      console.error("Error saving users to AsyncStorage:", error);
    }
  };

  const loadUsersFromStorage = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem("users");
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
    } catch (error) {
      console.error("Error loading users from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    loadUsersFromStorage();
  }, []);

  useEffect(() => {
    saveUsersToStorage(users);
  }, [users]);

  return (
    <UserContext.Provider
      value={{ users, setUsers, currentUser, setCurrentUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
