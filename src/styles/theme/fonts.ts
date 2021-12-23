const fonts = {
  sizes: {
    _12: 12,
    _13: 13,
    _14: 14,
    _15: 15,
    _16: 16,
    _18: 18,
    _20: 20,
    _24: 24,
  },
  family: {
    light: 'Inter-Thin',
    regular: 'Inter-Regular',
    semiBold: 'Inter-Medium',
    bold: 'Inter-SemiBold',
  },
};

type _ = typeof fonts;

export interface Fonts extends _ {}
export default fonts;
