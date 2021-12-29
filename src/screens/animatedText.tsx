import React, { useRef } from 'react';
import { View, Animated, Alert } from 'react-native';
import { Routes, ScreenProps } from '../navigation';

import useStyles from '../styles/screens/animatedText';

const AnimatedText = (
  props: ScreenProps<{ route: { duration: number }; [key: string]: any }>,
) => {
  const { duration = 500 } = props.route.params ?? {};
  const text =
    'I would like to animate this text like its appearing from bottom in React Native ❤️';
  const textArray = text.trim().split(/(\s+)/);
  const styles = useStyles();

  const animatedValues = useRef(textArray.map((_, i) => new Animated.Value(0))).current;

  const [value, setValue] = React.useState(1);

  const animated = (toValue = 1) => {
    const animations = textArray.map((_, i) => {
      return Animated.timing(animatedValues[i], {
        toValue,
        duration: duration,
        useNativeDriver: true,
      });
    });

    return Animated.stagger(
      duration / 5,
      toValue ? animations : animations.reverse(),
    ).start(({ finished }) => {
      if (finished) {
        setValue(Math.abs(value - 1));
      }
    });
  };

  React.useEffect(() => {
    animated(value);
  }, [value]);

  return (
    <View style={styles.container}>
      <View style={styles.textWrap}>
        {textArray.map((t, i) => {
          return (
            <Animated.Text
              key={`${t}-${i}`}
              style={[
                styles.text,
                {
                  opacity: animatedValues[i],
                  transform: [
                    {
                      translateY: Animated.multiply(
                        animatedValues[i],
                        new Animated.Value(-5),
                      ),
                    },
                  ],
                },
              ]}>
              {t}
            </Animated.Text>
          );
        })}
      </View>
    </View>
  );
};

export default AnimatedText;
