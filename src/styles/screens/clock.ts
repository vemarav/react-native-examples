import { Dimensions, StyleSheet } from 'react-native';
import useTheme, { Theme } from '../theme';

const getStyleSheet = ({ colors, fonts }: Theme) => {
  const { width } = Dimensions.get('screen');
  const size = width * 0.9;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background._1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mover: {
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: size / 2,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    hours: {
      height: '35%',
      backgroundColor:
        colors.scheme === 'light' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)',
      marginTop: '15%',
      width: 4,
      borderRadius: 4,
    },
    minutes: {
      height: '45%',
      backgroundColor:
        colors.scheme === 'light' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
      marginTop: '5%',
      width: 3,
      borderRadius: 3,
    },
    seconds: {
      height: '50%',
      backgroundColor: 'rgba(227, 71, 134, 1)',
      width: 2,
      borderRadius: 2,
    },
    smallCircle: {
      width: 10,
      height: 10,
      position: 'absolute',
      borderRadius: 10,
      backgroundColor: 'rgba(227, 71, 134, 1)',
    },
    mediumCircle: {
      width: size * 0.5,
      height: size * 0.5,
      position: 'absolute',
      borderRadius: size * 0.4,
      backgroundColor: 'rgba(200, 200, 200, 0.2)',
    },
    largeCircle: {
      width: size * 0.8,
      height: size * 0.8,
      position: 'absolute',
      borderRadius: size * 0.4,
      backgroundColor: 'rgba(200, 200, 200, 0.2)',
    },
  });
};

export default (props?: any) => {
  const theme = useTheme();
  const styles = getStyleSheet({ ...props, ...theme });

  return styles;
};
