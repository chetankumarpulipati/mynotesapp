import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkLoginStatus = async () => {
        try {
            const value = await AsyncStorage.getItem('isLoggedIn');
            setIsLoggedIn(value === '1');
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://10.0.2.2:3000/login', {
                email,
                password,
            });

            if (response.data.error) {
                Alert.alert('Error', response.data.error);
            } else {
                setIsLoggedIn(true);
                navigation.navigate('Home');
            }
        } catch (error) {
            console.log('Error:', error);
            Alert.alert('Invalid email or password');
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
            {/* <Button title="Home" onPress={() => navigation.navigate('Home')} /> */}
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