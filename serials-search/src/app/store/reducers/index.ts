import { SerialsState } from './serials.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSerials from '../reducers/serials.reducers';

export interface AppState {
  serials: fromSerials.SerialsState;
}

export const reducers = {
  serials: fromSerials.serialsReducer,
};

const getSerialsFeatureState = createFeatureSelector<fromSerials.SerialsState>(
  fromSerials.serialsFeatureKey
);

const getSerialsState = createSelector(getSerialsFeatureState, (state) => {
  return state;
});

export const getAllThematicPathsData = createSelector(
  getSerialsState,
  fromSerials.getSerials
);
