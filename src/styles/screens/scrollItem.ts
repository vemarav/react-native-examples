import { StatusBar, StyleSheet } from 'react-native';
import useTheme, { Theme } from '../theme';

const getStyleSheet = ({ colors, fonts }: Theme) => {
  const spacing = 20;
  const imageSize = 70;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background._1,
    },
    bgImage: {
      ...StyleSheet.absoluteFillObject,
      transform: [{ rotateZ: '180deg' }, { rotateY: '180deg' }],
    },
    listContainer: {
      padding: spacing,
      paddingTop: StatusBar.currentHeight ?? 35 + spacing,
    },
    item: {
      flexDirection: 'row',
      padding: spacing,
      marginBottom: spacing,
      borderRadius: 12,
      backgroundColor: `${colors.background._1}50`,
      borderWidth: colors.scheme === 'light' ? 1 : 0,
      borderColor: `${colors.background._1}90`,
      shadowColor: colors.background._2,
      shadowOpacity: 0.2,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 5 },
      alignItems: 'center',
    },
    avatar: {
      width: imageSize,
      height: imageSize,
      borderRadius: imageSize / 2,
      marginRight: spacing / 2,
    },
    name: {
      color: colors.text._2,
      fontSize: fonts.sizes._16,
      fontFamily: fonts.family.semiBold,
      marginBottom: 10,
    },
    job: {
      color: colors.text._2,
      fontSize: fonts.sizes._14,
      fontFamily: fonts.family.regular,
      opacity: 0.7,
    },
    email: {
      color: colors.text._3,
      fontSize: fonts.sizes._12,
      fontFamily: fonts.family.regular,
    },
  });
};

export default (props?: any) => {
  const theme = useTheme();
  const styles = getStyleSheet({ ...props, ...theme });

  return {
    ...styles,
    ...theme,
    itemSize: styles.avatar.height + styles.item.padding * 3,
  };
};
