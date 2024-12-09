import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import sha256 from "js-sha256"; 
import { UserContext } from "../contexts/UserContext"; 

const SignInPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { users, setCurrentUser } = useContext(UserContext); 

  // Email validation
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignIn = () => {
    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    // Check if the user exists
    if (!users[email]) {
      Alert.alert("User Not Found", "No account found for this email.");
      return;
    }

    const hashedPassword = sha256(password);

    // Check if the hashed password matches
    if (users[email] === hashedPassword) {
      Alert.alert("Success", "You are signed in!");
      setCurrentUser(email);
      navigation.navigate("MainMenu");
    } else {
      Alert.alert("Invalid Credentials", "Incorrect email or password.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.buttonContainer}>
        <Button title="Sign In" onPress={handleSignIn} color="#32CD32" />
      </View>

      <Text
        style={styles.signUpText}
        onPress={() => navigation.navigate("SignUp")}
      >
        Don't have an account? Sign Up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#C2B280", 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#fff", 
  },
  signUpText: {
    marginTop: 10,
    fontSize: 14,
    color: "#007BFF", 
    textDecorationLine: "underline",
  },
  buttonContainer: {
    width: "60%", 
    marginVertical: 20, 
  },
});

export default SignInPage;
