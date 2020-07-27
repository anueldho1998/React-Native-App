

import React, { Component } from 'react';
import Loading from '../Screens/LoadingScreen';
import Login from '../Screens/Login';
import Home from '../Screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
const Stack = createStackNavigator();
class Navigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
const MySwitchNavigator = createSwitchNavigator(
  {
    Loading: Loading,
    Login: Login,
    Home: Home,
  },
  {
    initialRouteName: "Loading",
  }

);
export default createAppContainer(MySwitchNavigator);
