import { StyleSheet } from 'react-native';
import useTheme, { Theme } from '../theme';

const getStyleSheet = ({ colors, fonts }: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background._1,
      justifyContent: 'center',
    },
    text: {
      color: colors.text._1,
      fontSize: fonts.sizes._20,
      fontFamily: fonts.family.regular,
      textAlign: 'center',
    },
    textWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginHorizontal: 30,
    },
  });
};

export default (props?: any) => {
  const theme = useTheme();
  const styles = getStyleSheet({ ...props, ...theme });

  return styles;
};
