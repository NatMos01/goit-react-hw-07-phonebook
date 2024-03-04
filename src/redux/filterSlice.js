import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState.filter,
  reducers: {
    setFilter: (_, action) => action.payload,
  },
});

export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;