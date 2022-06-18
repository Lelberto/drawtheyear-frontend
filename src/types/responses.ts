/** API response types */

import { Day, User } from './data';
import { Hateoas } from './hateoas';

/** Base response */
export type Response = {
  data: any;
}

/** Entry point response */
export type EntryPointResponse = {
  data: Hateoas;
}

/** Users response */
export type UsersResponse = {
  data: {
    users: User[];
  };
}

/** Days response */
export type DaysResponse = {
  data: {
    days: Day[];
  };
}
