import React from 'react';
import { View, Text } from 'react-native';

import useStyles from '../styles/screens/parallax';
import { Routes, ScreenProps } from '../navigation';

const Parallax = (props: ScreenProps<any>) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Parallax</Text>
    </View>
  );
};

export default Parallax;
