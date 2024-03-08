import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import SignupScreen from './src/screens/signup_screen/SignupScreen';
import HomeScreen from './src/screens/home_screen/HomeScreen';
import LoginScreen from './src/screens/login_screen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [signedUp, setSignedUp] = React.useState(false);

  return (
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
      </Stack.Navigator>
    </NavigationContainer>
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
