import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../types';

export const searchValueSelector = createSelector(
  (state: RootState) => state.searchValue,
  (searchValue) => searchValue
);
