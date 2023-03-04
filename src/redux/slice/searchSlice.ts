import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';


type SearchState = {
  coinSearch: string
  tickerSearch: string
}

const initialState: SearchState = {
  coinSearch: '',
  tickerSearch: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCoinSearch(state: SearchState, action: PayloadAction<string>): void {
      state.coinSearch = action.payload;
    },
    setTickerSearch(state: SearchState, action: PayloadAction<string>) {
      state.tickerSearch = action.payload;
    }
  },
});

export function selectSearchState(state: RootState): SearchState {
  return state.search;
}

export const { setCoinSearch, setTickerSearch } = searchSlice.actions;

export default searchSlice.reducer;