import { Entity } from './data.types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Response {}

export interface CreationResponse extends Response {
  id: string;
}

export interface DataResponse<T extends Entity | Entity[]> extends Response {
  data: T;
}

export interface AccessTokenResponse extends Response {
  accessToken: string;
  refreshToken: string;
  timestamp: number;
  expiration: number;
}
