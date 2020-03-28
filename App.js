import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//login flow
import LoginHomeScreen from './src/screens/login/LoginHomeScreen';
import SignInScreen from './src/screens/login/SignInScreen';
import SignUpScreen from './src/screens/login/SignUpScreen';

const Stack = createStackNavigator();

const LoginFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginHome" component={LoginHomeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="LoginHome" component={LoginHomeScreen} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (

  );
}

export default App;