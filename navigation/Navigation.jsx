import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//auth
import { getFirebaseApp } from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
//Screens
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CompetitionsScreen from '../screens/Competitions';

const app = getFirebaseApp();
const auth = getAuth(app);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const [loggedIn, SetLoggedIn] = useState(false)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User Logged In... " + user.email)
        SetLoggedIn(true)
      } else {
        console.log("User Not Logged In")
        SetLoggedIn(false)
      }
    })
    return unsubscribe
  }, [])

  function Home() {
    return (
      <Tab.Navigator initialRouteName='Competitions'>
        <Tab.Screen name='Profile'
        component={ProfileScreen} 
        options={{
          headerShown: false
        }}
        />
        <Tab.Screen 
        name='Competitions' 
        component={CompetitionsScreen} options={{
          headerShown: false
        }}
        />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      {loggedIn ? (
        <Stack.Navigator >
          <Stack.Screen
            name='Home'
            component={Home}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{
              headerShown: false
            }} />
          <Stack.Screen
            name='Signup'
            component={SignupScreen}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

export default Navigation