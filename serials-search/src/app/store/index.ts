import { ActionReducerMap, createSelector } from '@ngrx/store';

import * as fromSerials from '../store/reducers/serials.reducers';

export interface AppState {
  serials: fromSerials.SerialsState;
}

export const reducers: ActionReducerMap<AppState> = {
  serials: fromSerials.serialsReducer,
};

export const getState = (state: AppState) => state.serials;

export const getSerialsData = createSelector(getState, fromSerials.getSerials);
export const getSettingsData = createSelector(getState, fromSerials.getSerials);
