import fonts, { Fonts } from './fonts';
import useColors, { Colors } from './colors';

export interface Theme {
  fonts: Fonts;
  colors: Colors;
}

const useTheme = (): Theme => {
  const colors = useColors();

  return { fonts, colors };
};

export default useTheme;
