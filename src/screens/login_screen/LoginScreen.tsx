import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    
        const navigation = useNavigation();

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const handleLogin = async () => {
            try {
                const response = await axios.post('http://10.0.2.2:3000/login', {
                  email,
                  password,
                });
                if (response.data.error) {
                    Alert.alert('Error', response.data.error);
                  } else {
                    console.log("Logged in successfully!")
                    navigation.navigate('Home');
                  }
                } catch (error) {
                  console.log('Error:', error);
                  Alert.alert('Invalid username or password! Please try again.');
                }
        };

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
            <Text style={styles.line_space}>Don't have an account?<Text> </Text><Text onPress={() => navigation.navigate('Signup')}>Sign Up</Text></Text>
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