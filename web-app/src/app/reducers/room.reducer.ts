import { Action, createReducer, on } from '@ngrx/store';
import * as Actions from './room.actions';
import { Room } from 'generated/api/models';

export interface State {
  rooms: Room[]
}
export const initialState: State = {
  rooms: []
};

const roomsReducer = createReducer(
  initialState,
  on(Actions.setRooms, (state, action) => ({ ...state, rooms: action.rooms })),
);

export function reducer(state: State | undefined, action: Action) {
  return roomsReducer(state, action);
}
