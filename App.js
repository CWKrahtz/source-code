import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

//Screens
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      
      // <View style={styles.container}>
      //   <LoginScreen />
      // </View>

      <NavigationContainer>
        <StatusBar />
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen style={styles.container} name='Login' component={LoginScreen} />
          <Stack.Screen name='Signup' component={SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000032',
  },
});
