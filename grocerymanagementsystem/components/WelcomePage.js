import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const WelcomePage = ({ navigation }) => {
  //const imageUri = "./assets/pet.png";

  return (
    <View style={styles.container}>
      {/* Image of worm or cabbage */}
      <Image source={require("../assets/pet.png")} style={styles.image} />

      <Text style={styles.text}>Welcome</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C2B280",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#32CD32",
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    width: "60%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 200, 
    height: 200, 
    marginBottom: 30, 
  },
});

export default WelcomePage;
