import React, { useRef } from 'react';
import { Animated, StatusBar, Text, View } from 'react-native';
import { faker } from '@faker-js/faker';

import useStyles from '../styles/screens/scrollItem';
import FastImage from 'react-native-fast-image';

faker.seed(30);

const DATA = Array(30)
  .fill('')
  .map((_, i) => ({
    key: faker.database.mongodbObjectId(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.arrayElement([
      'women',
      'men',
    ])}/${faker.number.int(60)}.jpg`,
    name: faker.person.fullName(),
    job: faker.person.jobTitle(),
    email: faker.internet.email(),
  }));

const ScrollItem = () => {
  const styles = useStyles();
  const scrollY = useRef(new Animated.Value(0)).current;

  const bgImage =
    styles.colors.scheme === 'light'
      ? 'https://images.unsplash.com/photo-1580775702218-1f746c0c49b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80'
      : 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FastImage source={{ uri: bgImage }} style={styles.bgImage} />
      <Animated.FlatList
        data={DATA}
        style={styles.listContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          },
        )}
        keyExtractor={item => item.key}
        renderItem={({ item, index }) => {
          const interpolation = {
            inputRange: [
              -1,
              0,
              styles.itemSize * index,
              styles.itemSize * (index + 2),
            ],
            outputRange: [1, 1, 1, 0],
          };

          const opacityInterpolation = {
            inputRange: [
              -1,
              0,
              styles.itemSize * index,
              styles.itemSize * (index + 0.8),
            ],
            outputRange: [1, 1, 1, 0],
          };

          const animatedStyle = {
            opacity: scrollY.interpolate(opacityInterpolation),
            transform: [{ scale: scrollY.interpolate(interpolation) }],
          };

          return (
            <Animated.View style={[styles.item, animatedStyle]}>
              <FastImage source={{ uri: item.image }} style={styles.avatar} />
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.job}>{item.job}</Text>
                <Text style={styles.email}>{item.email}</Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default ScrollItem;
