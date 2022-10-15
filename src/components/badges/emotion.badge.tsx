import classNames from 'classnames';
import Color from 'color';
import { BaseHTMLAttributes } from 'react';
import { Emotion } from '../../types/data.types'

export type EmotionBadgeProps = BaseHTMLAttributes<HTMLDivElement> & {
  emotion: Emotion;
}

export const EmotionBadge = ({ emotion, className, ...props }: EmotionBadgeProps) => {
  const color = Color(emotion.color);

  className = classNames(
    'px-2 py-1',
    'rounded-md',
    'ring-2 ring-light ring-opacity-20 hover:ring-opacity-100',
    'transition-all duration-200',
    className
  );
  const spanClassName = classNames(
    { 'text-light': color.isDark() },
    { 'text-dark': color.isLight() }
  ); 

  return (
    <div className={className} style={{ backgroundColor: emotion.color }} {...props}>
      <span className={spanClassName}>{emotion.name}</span>
    </div>
  );
}
