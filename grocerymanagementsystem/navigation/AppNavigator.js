import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import WelcomePage from "../components/WelcomePage";
import OptionsPage from "../components/OptionsPage";
import GroceryList from "../components/GroceryList";
import AddProduct from "../components/AddProduct";
import Notifications from "../components/Notifications";
import SignInPage from "../components/SignInPage";
import SignUpPage from "../components/SignUpPage";
import MainMenuPage from "../components/MainMenuPage";

const Stack = createStackNavigator();

const AppNavigator = () => {
  // Shared state for groceries
  const [groceries, setGroceries] = useState([
    { id: "1", name: "Apples", quantity: "5 kg", category: "Fruits" },
    { id: "2", name: "Bread", quantity: "1 loaf", category: "Bakery" },
  ]);

  // Function to add a new product
  const addProduct = (newProduct) => {
    setGroceries((prev) => [...prev, newProduct]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {/* Welcome Screen */}
        <Stack.Screen name="Welcome" component={WelcomePage} />

        {/* Options Page */}
        <Stack.Screen name="Options">
          {(props) => (
            <OptionsPage {...props} groceries={groceries} addProduct={addProduct} />
          )}
        </Stack.Screen>

        {/* Grocery List */}
        <Stack.Screen name="GroceryList">
          {(props) => (
            <GroceryList {...props} groceries={groceries} addProduct={addProduct} />
          )}
        </Stack.Screen>

        {/* Add Product */}
        <Stack.Screen
          name="AddProduct"
          options={{ title: "Add Product" }}
        >
          {(props) => <AddProduct {...props} addProduct={addProduct} />}
        </Stack.Screen>

        {/* Notifications */}
        <Stack.Screen name="Notifications" component={Notifications} />

        {/* Sign-In Page */}
        <Stack.Screen name="SignIn" component={SignInPage} />

        {/* Sign-Up Page */}
        <Stack.Screen name="SignUp" component={SignUpPage} />

        {/* Main Menu */}
        <Stack.Screen
          name="MainMenu"
          component={MainMenuPage}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Notifications")}
                style={{ marginRight: 16 }}
              >
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            ),
            title: "Main Menu",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;