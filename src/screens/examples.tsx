import React from 'react';
import { ScrollView, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Routes, ScreenProps } from '../navigation';

import useStyles from '../styles/screens/examples';

const Examples = (props: ScreenProps<any>) => {
  const styles = useStyles();

  const navigateTo = (screen: string, params = {}) => {
    props.navigation.navigate(screen, params);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.values(Routes).map(screen =>
        screen === Routes.Examples ? null : (
          <TouchableOpacity key={screen} onPress={() => navigateTo(screen)}>
            <Text style={styles.text}>{screen}</Text>
          </TouchableOpacity>
        ),
      )}
    </ScrollView>
  );
};

export default Examples;
