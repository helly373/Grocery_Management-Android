import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import UserProvider from './contexts/UserContext';
import GroceryProvider from './contexts/GroceryProvider';

export default function App() {
  return (
    <UserProvider>
    <GroceryProvider>
      <AppNavigator />
    </GroceryProvider>
    </UserProvider>
    
  
  );
}
