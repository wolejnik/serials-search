import { Serial } from './../../models/serial';
import { createAction, props } from '@ngrx/store';

export const saveSerials = createAction(
  '[Serials Component] Saved arrays of serials',
  props<{ value: Serial[] }>()
);
export const searchedSerial = createAction(
  '[Serials Component] Searched serial',
  props<{ value: string }>()
);
