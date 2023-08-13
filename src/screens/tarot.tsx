import { Dimensions, Image, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import useStyles from '../styles/screens/tarot';
import React, { useEffect } from 'react';

const { width: windowWidth } = Dimensions.get('window');
const tarotCardImg =
  'https://img.freepik.com/free-vector/mystical-golden-frame-black-background_53876-119243.jpg';

const numberOfCards = 56;
const _size = 100;
const _cardSize = {
  width: _size,
  height: _size * 1.67,
  borderRadius: 12,
  backgroundColor: '#C2C2C2',
};

type Card = {
  key: string;
  uri: string;
};

const cards: Card[] = [...Array(numberOfCards).keys()].map(index => ({
  key: `card-[${index}]`,
  uri: tarotCardImg,
}));

const TWO_PI = 2 * Math.PI;
const theta = TWO_PI / numberOfCards;
const cardVisibilityPercentile = 0.5;
const cardSize = _cardSize.width * cardVisibilityPercentile;
const circleRadius = Math.max(
  (cardSize * numberOfCards) / TWO_PI,
  windowWidth / 2,
);
const circleDiameter = 2 * circleRadius;
const circleCircumFerence = TWO_PI * circleRadius;
const changeFactor = circleCircumFerence / windowWidth;

function TarotCard({
  card,
  index,
  interpolatedIndex,
}: {
  card: Card;
  index: number;
  interpolatedIndex: SharedValue<number>;
}) {
  const mounted = useSharedValue(0);

  useEffect(() => {
    mounted.value = withTiming(1, { duration: 500 });
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${interpolate(
            mounted.value,
            [0, 1],
            [0, theta * index],
          )}rad`,
        },
        {
          translateY: interpolate(
            interpolatedIndex.value,
            [index - 1, index, index + 1],
            [0, -_cardSize.height / 2, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: _cardSize.width,
          height: circleRadius * 2,
          position: 'absolute',
        },
        animatedStyles,
      ]}>
      <Image
        source={{ uri: card.uri }}
        style={{ ..._cardSize, borderWidth: 3, borderColor: '#424242' }}
      />
    </Animated.View>
  );
}

function TarotWheel({
  cards,
  onIndexChange,
}: {
  cards: Card[];
  onIndexChange(index: number): void;
}) {
  const distance = useSharedValue(0);
  const angle = useDerivedValue(() => {
    return distance.value / circleCircumFerence;
  });
  const interpolatedIndex = useDerivedValue(() => {
    const floatIndex = Math.abs((angle.value % TWO_PI) / theta);
    return angle.value < 0 ? floatIndex : numberOfCards - floatIndex;
  });
  const activeIndex = useDerivedValue(() => {
    return Math.round(interpolatedIndex.value);
  });

  const gesture = Gesture.Pan()
    .onChange(ev => {
      distance.value += ev.changeX * changeFactor;
    })
    .onFinalize(ev => {
      distance.value = withDecay(
        {
          velocity: ev.velocityX,
          velocityFactor: changeFactor,
        },
        () => {
          const newFloatAngle = -interpolatedIndex.value * theta;
          const newAngle = -activeIndex.value * theta;
          distance.value = newFloatAngle * circleCircumFerence;
          distance.value = withSpring(newAngle * circleCircumFerence);
          runOnJS(onIndexChange)(activeIndex.value);
        },
      );
    });

  useEffect(() => {
    const newFloatAngle = -interpolatedIndex.value * theta;
    const newAngle = -activeIndex.value * theta;
    distance.value = newFloatAngle * circleCircumFerence;
    distance.value = withSpring(newAngle * circleCircumFerence);
    runOnJS(onIndexChange)(activeIndex.value);
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${angle.value}rad`,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          {
            width: circleDiameter,
            height: circleDiameter,
            borderRadius: circleRadius,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            bottom: -(_cardSize.height * 2.5),
          },
          animatedStyles,
        ]}>
        {cards.map((card, index) => (
          <TarotCard
            index={index}
            key={card.key}
            card={card}
            interpolatedIndex={interpolatedIndex}
          />
        ))}
      </Animated.View>
    </GestureDetector>
  );
}

const TarotCards = () => {
  const styles = useStyles();
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: 'center',
          color: 'black',
          fontSize: 32,
          marginTop: 20,
        }}>
        Active Index: {activeIndex}
      </Text>

      <TarotWheel
        key={'dont-rerender-on-state-change'}
        cards={cards}
        onIndexChange={index => {
          setTimeout(() => setActiveIndex(index), 0);
        }}
      />
    </View>
  );
};

export default TarotCards;
