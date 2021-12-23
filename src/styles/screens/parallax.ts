import { StyleSheet } from 'react-native';
import useTheme, { Theme } from '../theme';

const getStyleSheet = ({ colors, fonts }: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background._1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    name: {
      fontSize: fonts.sizes._20,
      fontFamily: fonts.family.semiBold,
      color: colors.text._1,
    },
  });
};

export default (props?: any) => {
  const theme = useTheme();
  const styles = getStyleSheet({ ...props, ...theme });

  return styles;
};
