/** API response types */

import { Link } from './hateoas';

/** Base response */
export type Response = {
  data: any;
  links: Link[];
}
