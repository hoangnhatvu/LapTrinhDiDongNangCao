import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import IntroScreen from './IntroScreen';
import IndexScreen from './IndexScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="IndexScreen" component={IndexScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
