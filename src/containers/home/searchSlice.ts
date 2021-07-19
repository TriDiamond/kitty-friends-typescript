import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SearchState {
  searchField: string;
}

const initialState: SearchState = {
  searchField: '',
};

// Creating reducers and generate actions
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchField: (state, action: PayloadAction<string>) => {
      state.searchField = action.payload;
    },
  },
});

// Exporting all the actions
export const { setSearchField } = searchSlice.actions;

// Create selector to get the state from root state.
export const selectSearchField = (state: RootState) => state.search.searchField;

export default searchSlice.reducer;
