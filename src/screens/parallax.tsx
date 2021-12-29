import React, { useRef } from 'react';
import { View, Animated } from 'react-native';
import Image from 'react-native-fast-image';

import useStyles from '../styles/screens/parallax';
import { ScreenProps } from '../navigation';
import { ParallaxData } from '../common/datum';

const data = ParallaxData.map((uri, _) => ({
  key: uri,
  photo: { uri },
  avatar: {
    uri: `https://randomuser.me/api/portraits/women/${Math.floor(
      Math.random() * 40,
    )}.jpg`,
  },
}));

const AnimatedImage = Animated.createAnimatedComponent(Image);

const Parallax = () => {
  const styles = useStyles();
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        horizontal
        pagingEnabled
        bounces={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.key}
        renderItem={({ item: { photo, avatar }, index }) => {
          const width = styles.imageContainer.width;
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * 0.7, 0, width * 0.7],
          });
          return (
            <View style={styles.imageContainer}>
              <View style={styles.imageBorder}>
                <View style={styles.imageBox}>
                  <AnimatedImage
                    source={photo}
                    style={[styles.image, { transform: [{ translateX }] }]}
                  />
                </View>
                <Image source={avatar} style={styles.avatar} />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Parallax;
