import React from 'react';
import { ScrollView, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Routes, ScreenProps } from '../navigation';

import useStyles from '../styles/screens/examples';

const AnimatedText = (props: ScreenProps<any>) => {
  const styles = useStyles();

  const navigateTo = (screen: string, params = {}) => {
    props.navigation.navigate(screen, params);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigateTo(Routes.Parallax)}>
        <Text style={styles.text}>Parallax Carousel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo(Routes.AnimatedText)}>
        <Text style={styles.text}>Animated Text</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AnimatedText;
