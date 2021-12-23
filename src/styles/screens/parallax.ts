import { Dimensions, StyleSheet } from 'react-native';
import useTheme, { Theme } from '../theme';

const getStyleSheet = ({ colors, fonts }: Theme) => {
  const { width } = Dimensions.get('screen');
  const ITEM_WIDTH = width * 0.76;
  const ITEM_HEIGHT = ITEM_WIDTH * 1.42;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background._1,
      marginTop: -50,
    },
    imageContainer: {
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageBorder: {
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 0 },
      borderRadius: 18,
      backgroundColor: colors.background._1,
      padding: 12,
    },
    imageBox: {
      width: ITEM_WIDTH,
      height: ITEM_HEIGHT,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    image: {
      width: ITEM_WIDTH * 1.4,
      height: ITEM_HEIGHT,
      resizeMode: 'cover',
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 60,
      borderWidth: 6,
      position: 'absolute',
      bottom: -30,
      right: 60,
      borderColor: colors.border._1,
    },
  });
};

export default (props?: any) => {
  const theme = useTheme();
  const styles = getStyleSheet({ ...props, ...theme });

  return styles;
};
