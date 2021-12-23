import { CardStyleInterpolators, StackNavigationOptions } from '@react-navigation/stack';
import useTheme, { Theme } from '../theme';

const getScreenOptons = ({ colors }: Theme): StackNavigationOptions => ({
  headerShown: true,
  cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
});

const useParallaxOptions = (props?: any) => {
  const theme = useTheme();

  return getScreenOptons({ ...props, ...theme });
};

export default useParallaxOptions;
