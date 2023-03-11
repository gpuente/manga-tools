import { createSlice } from '@reduxjs/toolkit';

export const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState: '',
  reducers: {
    update: (state, action) => {
      if (typeof action.payload === 'string') {
        state = action.payload;
      }

      return state;
    },
    clear: (state) => {
      state = '';
      return state;
    },
  },
});
