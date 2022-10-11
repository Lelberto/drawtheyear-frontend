import classNames from 'classnames';
import { Link, LinkProps } from 'react-router-dom';

export type NavbarLinkProps = LinkProps & {
  current?: boolean;
};

export const NavbarLink = ({
  current = false,
  children,
  className,
  ...props
}: NavbarLinkProps) => {
  className = classNames(
    'px-4 py-2',
    'rounded-md',
    { 'bg-black/50': !current }, `hover:bg-light/25`,
    'transition-colors duration-200',
    className
  );
  return (
    <Link className={className} {...props}>
      {children}
    </Link>
  )
}
