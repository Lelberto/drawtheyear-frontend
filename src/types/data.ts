/** Data types */

/** User */
export type User = {
  id: string;
  email: string;
  username: string;
  name: string;
}

/** Emotion */
export type Emotion = {
  name: string;
  color: string;
}

/** Day */
export type Day = {
  date: Date;
  description: string;
  userId: string;
}
