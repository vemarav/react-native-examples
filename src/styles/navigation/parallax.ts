import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';
import useTheme, { Theme } from '../theme';

const getScreenOptons = ({ colors }: Theme): StackNavigationOptions => ({
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
});

const useParallaxOptions = (props?: any) => {
  const theme = useTheme();

  return getScreenOptons({ ...props, ...theme });
};

export default useParallaxOptions;
