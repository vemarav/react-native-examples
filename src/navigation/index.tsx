import React from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import Routes from './routes';

import Examples from '../screens/examples';
import useExampleOptions from '../styles/navigation/examples';
import AnimatedText from '../screens/animatedText';
import useAnimatedTextOptions from '../styles/navigation/animatedText';
import Parallax from '../screens/parallax';
import useParallaxOptions from '../styles/navigation/parallax';
import Clock from '../screens/clock';
import useClockOptions from '../styles/navigation/clock';

import useTheme from '../styles/theme';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

const Navigation = () => {
  const { colors } = useTheme();
  const exampleOptions = useExampleOptions();
  const parallaxOptions = useParallaxOptions();
  const animatedTextOptions = useAnimatedTextOptions();
  const clockOptions = useClockOptions();

  return (
    <>
      <StatusBar backgroundColor={colors.background._1} barStyle={colors.barStyle} />
      <NavigationContainer theme={colors.scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen
            options={exampleOptions}
            name={Routes.Examples}
            component={Examples}
          />
          <Stack.Screen
            options={parallaxOptions}
            name={Routes.Parallax}
            component={Parallax}
          />
          <Stack.Screen
            options={animatedTextOptions}
            name={Routes.AnimatedText}
            component={AnimatedText}
          />
          <Stack.Screen options={clockOptions} name={Routes.Clock} component={Clock} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export { Routes, type StackScreenProps as ScreenProps };
export default Navigation;
