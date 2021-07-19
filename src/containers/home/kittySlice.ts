import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type Kitty = {
  id: number;
  name: string;
  email: string;
};

export interface KittyState {
  kitties: Array<Kitty>;
  isPending: boolean;
  error: string;
}

const initialState: KittyState = {
  isPending: false,
  kitties: [],
  error: '',
};

// A thunk for fetching kittles
export const getKittiesAsync = createAsyncThunk(
  'kitty/fetchKitties',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const data = await response.json();
      // Will become the `fulfilled` action payload
      return data;
    } catch (e) {
      return rejectWithValue('Something went wrong.');
    }
  }
);

// Create kitty slice
export const kittySlice = createSlice({
  name: 'kitty',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getKittiesAsync.pending, (state) => {
        state.isPending = true;
      })
      .addCase(getKittiesAsync.fulfilled, (state, action) => {
        state.isPending = false;
        state.kitties = action.payload;
      })
      .addCase(getKittiesAsync.rejected, (state, action) => {
        state.isPending = false;
        state.error = String(action.payload);
      });
  },
});

export const selectKitty = (state: RootState) => state.kitty;

export default kittySlice.reducer;
