import { StyleSheet } from 'react-native';
import useTheme, { Theme } from '../theme';

const getStyleSheet = ({ colors, fonts }: Theme) => {
  const circleSize = 100;
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    circleContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: 8,
      paddingBottom: 100,
      backgroundColor: 'gold',
    },
    circle: {
      backgroundColor: '#444444',
      width: circleSize,
      height: circleSize,
      borderRadius: circleSize / 2,
    },
    circleButton: {
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
    },
    arrow: {
      color: '#ffffff',
      fontSize: 35,
    },
  });
};

export default (props?: any) => {
  const theme = useTheme();
  const styles = getStyleSheet({ ...props, ...theme });

  return styles;
};
