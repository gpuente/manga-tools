import { combineReducers } from '@reduxjs/toolkit';

import { counterSlice } from '../slices';

export default combineReducers({
  // Add reducers here
  counter: counterSlice.reducer,
});
