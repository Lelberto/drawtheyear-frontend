import { useLayoutEffect, useMemo, useState } from 'react';
import { MediaQuery } from '../types/tailwindcss.types';

export const useGetMediaQuery = (): MediaQuery => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const { SM, MD, LG, XL, XXL } = MediaQuery;

  useLayoutEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return useMemo(() =>
      width < SM ? SM :
      width < MD ? MD :
      width < LG ? LG :
      width < XL ? XL : XXL,
    [width]);
}
