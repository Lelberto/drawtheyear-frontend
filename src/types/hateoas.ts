/** HATEOAS types */

/** HATEOAS interface */
export interface Hateoas {
  _links: Link[];
}

/**
 * HATEOAS link
 * 
 * Links are included in API responses
 */
export type Link = {
  rel: Rel;
  method: Method;
  href: string;
}

/** HTTP methods */
export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/** HATEOAS rel */
export type Rel
  = 'users'
  | 'user-self'
  | 'user-emotions'
  | 'user-days'
  | 'day-emotions'
  | 'create-day';
