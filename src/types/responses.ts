/** API response types */

import { User } from './data';
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
    users: User[]
  };
}
