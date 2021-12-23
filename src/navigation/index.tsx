import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import Routes from './routes';

import Parallax from '../screens/parallax';
import useParallaxOptions from '../styles/navigation/parallax';

const Stack = createStackNavigator();

const Navigation = () => {
  const parallaxOptions = useParallaxOptions();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={parallaxOptions}
          name={Routes.Parallax}
          component={Parallax}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { Routes, type StackScreenProps as ScreenProps };
export default Navigation;
