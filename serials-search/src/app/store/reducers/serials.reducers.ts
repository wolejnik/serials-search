import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { saveSerials, searchedSerial } from '../actions/serials.actions';

export const serialsFeatureKey: string = 'serials';

export interface SerialsState {
  searchSerial: string;
  serials: any;
}

export const initialState: SerialsState = {
  searchSerial: null,
  serials: null,
};

const _serialsReducer = createReducer(
  initialState,
  on(saveSerials, (state, { value }) => ({
    ...state,
    serials: value,
  })),
  on(searchedSerial, (state, { value }) => ({
    ...state,
    searchSerial: value,
  }))
);

export function serialsReducer(state, action) {
  return _serialsReducer(state, action);
}

export const getSerials = (state: SerialsState) => state.serials;
export const getSerial = (state: SerialsState) => state.searchSerial;
