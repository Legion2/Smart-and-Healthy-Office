/* tslint:disable */
import { Keys } from './keys';
export interface ClientSubscription {
  endpoint: string;
  expirationTime: string;
  keys: Keys;
}
