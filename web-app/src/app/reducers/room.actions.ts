import { createAction, props } from '@ngrx/store';
import { Room } from 'generated/api/models';

export const setRooms = createAction(
  'set-rooms',
  props<{ rooms: Room[] }>()
);

