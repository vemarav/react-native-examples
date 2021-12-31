import React from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import Routes from './routes';

import Examples from '../screens/examples';
import AnimatedText from '../screens/animatedText';
import Parallax from '../screens/parallax';
import Clock from '../screens/clock';
import ScrollItem from '../screens/scrollItem';

import useStackOptions from '../styles/navigation/stack';
import useTheme from '../styles/theme';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

const Navigation = () => {
  const { colors } = useTheme();
  const stackOptions = useStackOptions();

  return (
    <>
      <StatusBar backgroundColor={colors.background._1} barStyle={colors.barStyle} />
      <NavigationContainer theme={colors.scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen
            options={stackOptions}
            name={Routes.Examples}
            component={Examples}
          />
          <Stack.Screen
            options={stackOptions}
            name={Routes.Parallax}
            component={Parallax}
          />
          <Stack.Screen
            options={stackOptions}
            name={Routes.AnimatedText}
            component={AnimatedText}
          />
          <Stack.Screen options={stackOptions} name={Routes.Clock} component={Clock} />
          <Stack.Screen
            options={stackOptions}
            name={Routes.ScrollItem}
            component={ScrollItem}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export { Routes, type StackScreenProps as ScreenProps };
export default Navigation;
