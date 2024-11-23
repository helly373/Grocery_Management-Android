import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import sha256 from 'js-sha256';
import { UserContext } from '../contexts/UserContext';

const SignInPage = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { users } = useContext(UserContext);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  

  const handleSignIn = () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (!users[email]) {
      Alert.alert('User Not Found', 'No account found for this email.');
      return;
    }
     const hashedPassword = sha256(password);
    if (users[email] === hashedPassword) {
      Alert.alert('Success', 'You are signed in!');
      navigation.navigate('MainMenu');
    } else {
      Alert.alert('Invalid Credentials', 'Incorrect email or password.');
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
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
    borderRadius: 8,
  },
});

export default SignInPage;
