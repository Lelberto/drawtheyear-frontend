import Color from 'color';

export const lighten = (color: string, value: number) => Color(color).lighten(value).hex();
export const darken = (color: string, value: number) => Color(color).darken(value).hex();
export const isLight = (color: string) => Color(color).isLight();
export const isDark = (color: string) => Color(color).isDark();

export function cssColors(...colors: string[]) {
  switch (colors.length) {
    case 0: return '#000000';
    case 1: return colors[0];
    default: {
      const gradientColors = colors.map((color, i, arr) => `${color} ${(i + 1) / arr.length * 100}%`);
      return `linear-gradient(150deg, ${gradientColors.join(', ')})`;
    }
  }
}
