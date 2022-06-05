/** Data types */

/** User */
export type User = {
  id: string;
  email: string;
  username: string;
  name: string;
}

/** Day */
export type Day = {
  date: Date;
  description: string;
  userId: string;
}
