import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import dayjs from 'dayjs';

import useStyles from '../styles/screens/clock';

const Clock = () => {
  const TICK_INTERVAL = 1000;
  const styles = useStyles();
  const index = useRef(new Animated.Value(0)).current;
  const tick = useRef(new Animated.Value(0)).current;
  const scales = useRef<Array<Animated.Value>>(
    Array(6)
      .fill('')
      .map(_ => new Animated.Value(0)),
  ).current;
  const timer = useRef(0);
  const ticker = useRef<any>(null);

  const animate = () => {
    const scaleStagger = scales.map(scale =>
      Animated.spring(scale, {
        toValue: 1,
        tension: 18,
        friction: 3,
        useNativeDriver: true,
      }),
    );

    Animated.parallel([
      Animated.stagger(TICK_INTERVAL / scales.length, scaleStagger),
      Animated.timing(index, {
        toValue: tick,
        duration: TICK_INTERVAL / 2,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    const current = dayjs();
    const diff = current.endOf('day').diff(current, 'seconds');
    const oneDay = 24 * 60 * 60;
    timer.current = oneDay - diff;
    tick.setValue(timer.current);
    index.setValue(timer.current);
    animate();
    ticker.current = setInterval(() => {
      timer.current += 1;
      tick.setValue(timer.current);
    }, TICK_INTERVAL);
    () => {
      clearInterval(ticker.current);
    };
  }, []);

  const interpolate = { inputRange: [0, 360], outputRange: ['0deg', '360deg'] };

  const sec = Animated.multiply(index, 6);
  const rotateSec = sec.interpolate(interpolate);
  const secTransform = { transform: [{ rotate: rotateSec }, { scale: scales[3] }] };

  const min = Animated.divide(sec, 60);
  const rotateMin = min.interpolate(interpolate);
  const minTransform = { transform: [{ rotate: rotateMin }, { scale: scales[4] }] };

  const hrs = Animated.divide(min, 12);
  const rotateHrs = hrs.interpolate(interpolate);
  const hrsTransform = { transform: [{ rotate: rotateHrs }, { scale: scales[5] }] };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.largeCircle, { transform: [{ scale: scales[2] }] }]}
      />
      <Animated.View
        style={[styles.mediumCircle, { transform: [{ scale: scales[1] }] }]}
      />
      <Animated.View style={[styles.mover, hrsTransform]}>
        <View style={styles.hours} />
      </Animated.View>
      <Animated.View style={[styles.mover, minTransform]}>
        <View style={styles.minutes} />
      </Animated.View>
      <Animated.View style={[styles.mover, secTransform]}>
        <View style={styles.seconds} />
      </Animated.View>
      <Animated.View
        style={[styles.smallCircle, { transform: [{ scale: scales[0] }] }]}
      />
    </View>
  );
};

export default Clock;
