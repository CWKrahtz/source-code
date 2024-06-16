// export default Navigation
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
// auth
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
// Screens
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CompetitionsScreen from '../screens/Competitions';
import SingleComp from '../screens/SingleComp';
import CreateCompetitionScreen from '../screens/CreateCompetitionScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';

// const app = getFirebaseApp();
// const auth = getAuth(app);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User Logged In... ' + user.email);
        setLoggedIn(true);
      } else {
        console.log('User Not Logged In');
        setLoggedIn(false);
      }
    });
    return unsubscribe;
  }, []);

  function Home() {
    return (
      <Tab.Navigator
        initialRouteName="Competitions"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Competitions') {
              iconName = focused ? 'trophy' : 'trophy-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: '#fff',
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
        })}
      >
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Competitions"
          component={CompetitionsScreen}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {loggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
          name="Details"
          component={SingleComp}
          options={{
            headerShown: false,
          }}
          />
          <Stack.Screen 
          name="CreateComp"
          component={CreateCompetitionScreen}
          options={{
            headerShown: false,
          }}
          />
          <Stack.Screen 
          name="Leaderboard"
          component={LeaderboardScreen}
          options={{
            headerShown: false,
          }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#212B5B',
    borderTopWidth: 0,
    elevation: 5,
    height: 100
  },
  tabBarLabel: {
    fontSize: 12,
    marginBottom: 5,
  },
});

export default Navigation;
