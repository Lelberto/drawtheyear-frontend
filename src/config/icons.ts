/**
 * FontAwesome icons configuration
 * 
 * Icons are loaded individually from the FontAwesome library.
 */

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome } from '@fortawesome/free-solid-svg-icons';

/** Loads icons */
export default () => {
  library.add(faHome);
}
