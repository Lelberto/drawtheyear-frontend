import { ReactNode } from 'react';

/** Cell props */
export type CellProps = {
  children?: ReactNode;
}

/** Cell */
export const Cell = ({ children }: CellProps) => {
  return (
    <div className="text-center border rounded-md">
      {children}
    </div>
  );
}
