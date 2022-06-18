import { useOutletContext } from 'react-router-dom'
import { Day } from '../types/data';

/**
 * Day hook
 * 
 * This hook will get the day included in outlet context.
 * 
 * @returns Day
 */
export const useDay = () => {
  const ctx = useOutletContext<{ day: Day }>();
  return ctx?.day;
}
