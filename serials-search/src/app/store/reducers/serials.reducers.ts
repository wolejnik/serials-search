import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from '../actions/serials.actions';

export const serialsFeatureKey: string = 'serials';

export interface SerialsState {
  serials: any;
  value: number;
}

export const initialState: SerialsState = {
  serials: null,
  value: 0,
};

const _serialsReducer = createReducer(
  initialState,
  on(increment, (state, { value }) => ({
    ...state,
    serials: null,
    value: value,
  })),
  on(decrement, (state, { value }) => ({
    ...state,
    serials: null,
    value: value,
  })),
  on(reset, (state, { value }) => ({
    ...state,
    serials: null,
    value: value,
  }))
);

export function serialsReducer(state, action) {
  return _serialsReducer(state, action);
}

export const getSerials = (state: SerialsState) => state.serials;
