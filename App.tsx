import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import SignupScreen from './src/screens/signup_screen/SignupScreen';
import HomeScreen from './src/screens/home_screen/HomeScreen';
import LoginScreen from './src/screens/login_screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { NativeBaseProvider, Box } from "native-base";
import AddNotes from './src/screens/add_notes/AddNotes';
import { NotesProvider, useNotes } from './src/context/NotesContext'; // Import NotesProvider and useNotes
import NotesScreen from './src/screens/notes_screen/NotesScreen';
import EditNotes from './src/screens/edit_notes';

const Stack = createNativeStackNavigator();

const App = () => {
  const [signedUp, setSignedUp] = React.useState(false);

  return (
    <NotesProvider {...{}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddNotes"
            component={AddNotes}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Notes"
            component={NotesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditNotes"
            component={EditNotes}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NotesProvider>
  );
};

const styles = StyleSheet.create(
  {
    text: {
      fontSize: 30,
    },
},
);

export default App;
