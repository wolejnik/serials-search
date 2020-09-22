import { createAction, props } from '@ngrx/store';

export const increment = createAction(
  '[Counter Component] Increment',
  props<{ value: number }>()
);
export const decrement = createAction(
  '[Counter Component] Decrement',
  props<{ value: number }>()
);
export const reset = createAction(
  '[Counter Component] Reset',
  props<{ value: number }>()
);
