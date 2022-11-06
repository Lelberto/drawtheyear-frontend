import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import { VariantProps } from '../../types/props.types';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps;

export const Button = ({ variant = 'primary', className, children, ...props }: ButtonProps) => {
  className = classNames(
    'px-2 py-1',
    `rounded ring-2 ring-${variant} ring-opacity-0 active:ring-opacity-70`,
    `bg-${variant}`,
    'opacity-100 hover:opacity-80 active:opacity-100 disabled:opacity-50',
    'transition-all duration-200',
    'disabled:cursor-not-allowed',
    className
  );
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
