/**
 * FontAwesome icons configuration
 * 
 * Icons are loaded individually from the FontAwesome library.
 */

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBrush, faCalendarDays, faFaceGrinBeam, faHome } from '@fortawesome/free-solid-svg-icons';

/** Loads icons */
export default () => {
  library.add(
    faBrush,
    faCalendarDays,
    faFaceGrinBeam,
    faHome
  );
}
