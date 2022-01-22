import React, { useRef, useState } from 'react';
import { Animated, Easing, Pressable, Text, View } from 'react-native';
import { ScreenProps } from '../navigation';

import useStyles from '../styles/screens/circle';

const Circle = (
  props: ScreenProps<{ route: { duration: number }; [key: string]: any }>,
) => {
  const styles = useStyles();
  const [index, setIndex] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const btnBg = styles.circle.backgroundColor;
  const circleBg = styles.circleContainer.backgroundColor;

  const containerBg = animatedValue.interpolate({
    inputRange: [0, 0.0001, 0.5, 0.5001, 1],
    outputRange: [circleBg, circleBg, circleBg, btnBg, btnBg],
  });

  const buttonBg = animatedValue.interpolate({
    inputRange: [0, 0.0001, 0.5, 0.5001, 1],
    outputRange: [btnBg, btnBg, btnBg, circleBg, circleBg],
  });

  const onPress = () => {
    setIndex(index === 0 ? 1 : 0);
    Animated.timing(animatedValue, {
      toValue: index === 0 ? 1 : 0,
      duration: 1200,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start();
  };

  return (
    <Animated.View style={[styles.circleContainer, { backgroundColor: containerBg }]}>
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [
              { perspective: 400 },
              {
                rotateY: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ['0deg', '-90deg', '-180deg'],
                }),
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 8, 1],
                }),
              },
            ],
          },
        ]}>
        <Pressable onPress={onPress}>
          <Animated.View
            style={[styles.circle, styles.circleButton, { backgroundColor: buttonBg }]}>
            <Text style={styles.arrow}>→</Text>
          </Animated.View>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

export default Circle;
