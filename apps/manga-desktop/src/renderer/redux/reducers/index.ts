import { combineReducers } from '@reduxjs/toolkit';

import { counterSlice, searchValueSlice } from '../slices';

export default combineReducers({
  // Add reducers here
  searchValue: searchValueSlice.reducer,
  counter: counterSlice.reducer,
});
