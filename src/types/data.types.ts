export interface Entity {
  id: string;
}

export interface User extends Entity {
  username: string;
  name: string;
  picture: string;
}

export interface Emotion extends Entity {
  name: string;
  color: string;
}

export interface Day extends Entity {
  date: string;
  resume: string;
  visibility: 'public' | 'private';
  emotions: Emotion[];
}