import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { addContact, deleteContact, fetchAll } from '../services/api';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState.contacts,
  extraReducers: builder => {
    builder

      // <-------------------------------------------------------------------->

      .addCase(fetchAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })

      // <-------------------------------------------------------------------->

      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = [...state.items, action.payload];
      })

      // <-------------------------------------------------------------------->

      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(item => item.id !== action.payload.id);
      })

      // <-------------------------------------------------------------------->

      .addMatcher(
        isAnyOf(fetchAll.pending, addContact.pending, deleteContact.pending),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchAll.rejected, addContact.rejected, deleteContact.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});
export const contactsReducer = contactsSlice.reducer;