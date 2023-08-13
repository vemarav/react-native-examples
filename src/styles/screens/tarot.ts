import { Dimensions, StyleSheet } from 'react-native';
import useTheme, { Theme } from '../theme';

const getStyleSheet = ({ colors, fonts }: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background._1,
    },
  });
};

export default (props?: any) => {
  const theme = useTheme();
  const styles = getStyleSheet({ ...props, ...theme });

  return styles;
};
