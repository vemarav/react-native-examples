import { useColorScheme } from 'react-native';

const light = {
  scheme: 'light',
  barStyle: 'dark-content',
  background: {
    _1: '#FFFFFF',
  },
  text: {
    _1: '#000000',
    _2: '#272727',
  },
  border: {
    _1: '#FFFFFF',
    _2: '#E5E5E5',
  },
};

const dark = {
  scheme: 'dark',
  barStyle: 'light-content',
  background: {
    _1: '#000000',
  },
  text: {
    _1: '#FFFFFF',
    _2: '#F8F8F8',
  },
  border: {
    _1: '#000000',
    _2: '#F8F8F8',
  },
};

type Light = typeof light;
type Dark = typeof dark;

export interface Colors extends Light, Dark {
  scheme: 'light' | 'dark' | any;
  barStyle: 'dark-content' | 'light-content' | any;
}

const useColors = (): Colors => {
  const colorScheme = useColorScheme();

  return colorScheme === 'light' ? light : dark;
};

export default useColors;
