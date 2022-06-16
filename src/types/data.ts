/** Data types */

import { Hateoas } from './hateoas';

/** User */
export type User = Hateoas & {
  id: string;
  email: string;
  username: string;
  name: string;
}

/** Emotion */
export type Emotion = Hateoas & {
  name: string;
  color: string;
}

/** Day */
export type Day = Hateoas & {
  date: Date;
  description: string;
  userId: string;
}
