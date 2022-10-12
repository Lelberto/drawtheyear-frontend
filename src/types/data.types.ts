export interface Entity {
  id: string;
}

export interface User extends Entity {
  username: string;
  name: string;
}