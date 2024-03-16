import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginScreen = () => {
    const navigation = useNavigation();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLoginSuccess = async token => {
      try {
        await AsyncStorage.setItem('token', token);
        console.log('Token stored successfully');
      } catch (error) {
        console.error('Error saving token:', error);
      }
    };
  
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          console.log('Token retrieved:', token);
          return token;
        } else {
          console.log('No token found');
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };
  
    const handleLogin = async () => {
        try {
          const response = await axios.post('http://10.0.2.2:3000/login', {
            email,
            password,
          });
      
          if (response.data.error) {
            Alert.alert('Error', response.data.error);
          } else if (response.data.token) { // Ensure token is present
            // Store the token upon successful login
            handleLoginSuccess(response.data.token);
            // Navigate to the home screen
            navigation.navigate('Home');
          } else if (response.data.message === 'User logged in') {
            console.log('User logged in but no token received'); // Log for debugging
            Alert.alert('Error', 'No token received from server');
          } else {
            console.log('Unexpected response from server:', response.data);
            Alert.alert('Error', 'Unexpected response from server');
          }
        } catch (error) {
          console.error('Error:', error);
          Alert.alert('Error', 'Invalid email or password');
        }
      };
      
    
    useEffect(() => {
      // Check if token exists on component mount
      const checkToken = async () => {
        const token = await getToken();
        if (token) {
          // Token exists, navigate to home screen
          navigation.navigate('Home');
        }
      };
      checkToken();
    }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.line_space}>
        Don't have an account?<Text> </Text>
        <Text onPress={() => navigation.navigate('Signup')}>Sign Up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  line_space: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default LoginScreen;
