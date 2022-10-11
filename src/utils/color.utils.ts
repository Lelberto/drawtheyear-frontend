import Color from 'color';

export const lighten = (color: string, value: number) => Color(color).lighten(value).hex();
export const darken = (color: string, value: number) => Color(color).darken(value).hex();
