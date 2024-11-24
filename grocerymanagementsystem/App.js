import React, { useState } from "react";
import AppNavigator from "./navigation/AppNavigator";
import UserProvider from "./contexts/UserContext";
import Toast from "react-native-toast-message";
import GroceryProvider from "./contexts/GroceryProvider";
import { ActivityProvider } from "./contexts/ActivityProvider";

export default function App() {
  // const [currentPage, setCurrentPage] = useState("");
  return (
    <ActivityProvider>
      <UserProvider>
        <GroceryProvider>
          <AppNavigator />
          <Toast />
        </GroceryProvider>
      </UserProvider>
    </ActivityProvider>
  );
}
