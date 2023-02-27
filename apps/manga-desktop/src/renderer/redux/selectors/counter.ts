import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../types';

export const counterSelector = createSelector(
  (state: RootState) => state.counter.value,
  (value) => value
);
