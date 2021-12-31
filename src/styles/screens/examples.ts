import { Dimensions, StyleSheet } from 'react-native';
import useTheme, { Theme } from '../theme';

const getStyleSheet = ({ colors, fonts }: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background._1,
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    text: {
      paddingVertical: 10,
      color: colors.text._2,
      fontSize: fonts.sizes._16,
      fontFamily: fonts.family.regular,
    },
  });
};

export default (props?: any) => {
  const theme = useTheme();
  const styles = getStyleSheet({ ...props, ...theme });

  return styles;
};
