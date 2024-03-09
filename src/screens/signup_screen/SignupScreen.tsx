import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  function handleLogin() {
    navigation.navigate('Login');
  }
  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSignup = async () => {
    // Check if username, email, or password is empty
    if (!username) {
      Alert.alert('Please enter username');
      return;
    }
    if (!email) {
      Alert.alert('Please enter email');
      return;
    }
    if (!password) {
      Alert.alert('Please enter password');
      return;
    }
  
    try {
      var response = await axios.post('http://10.0.2.2:3000/register', {
        username,
        email,
        password,
      });
  
      if (response.data.error) {
        Alert.alert(response.data.error);
      } else {
        console.log(`Username: "${username}"`);
        console.log(`Email: "${email}"`);
        console.log(`Password: "${password}"`);
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Email already exists! Please use a different email.');
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={handleUsernameChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={handleEmailChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
      />
      <Button title="Sign Up" onPress={handleSignup} />
        <Text style={styles.line_space}>Already have an account?<Text> </Text><Text onPress={handleLogin}>Login</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    padding: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  line_space: {
    marginTop: 20,
  },
});

export default SignupScreen;

