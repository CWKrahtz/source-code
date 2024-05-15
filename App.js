import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//Screens
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation/Navigation';

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <SafeAreaProvider style={styles.container}>
      <StatusBar style="light" />
      <Navigation />
    </SafeAreaProvider>
    // <SafeAreaProvider>
    //   <NavigationContainer>
    //     <StatusBar style="light" />
    //     <Stack.Navigator initialRouteName='Login'>
    //       <Stack.Screen
    //         name='Login'
    //         component={LoginScreen}
    //         options={{
    //           headerShown: false

    //         }} />
    //       <Stack.Screen
    //         name='Signup'
    //         component={SignupScreen}
    //         options={{
    //           headerShown: false
    //         }}
    //       />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000032',
  },
});
