import { ReactNode } from 'react';

/** Cell props */
export type CellProps = {
  children?: ReactNode;
  onClick?: () => void;
}

/** Cell */
export const Cell = ({ children, onClick }: CellProps) => {
  return (
    <div className="text-center border rounded-md" onClick={onClick}>
      {children}
    </div>
  );
}
