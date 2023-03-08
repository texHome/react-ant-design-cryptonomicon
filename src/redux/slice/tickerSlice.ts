import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Ticker {
  name: string;
  price: string;
  url: string
}

type TickerSliceState = {
  tickers: Ticker[],
  selectedTickerName: string | null
}

const initialState: TickerSliceState = {
  tickers: [],
  selectedTickerName: null
};

export const tickerSlice = createSlice({
  name: 'ticker',
  initialState,
  reducers: {
    addTicker(state: TickerSliceState, action: PayloadAction<Ticker>): void {
      state.tickers.push(action.payload);
    },
    removeTicker(state: TickerSliceState, action: PayloadAction<string>): void {
      state.tickers = state.tickers.filter(ticker => ticker.name !== action.payload);
    },
    updateTicker(state: TickerSliceState, action: PayloadAction<Ticker>): void {
      state.tickers
        .filter(ticker => ticker.name === action.payload.name)
        .forEach(ticker => ticker.price = action.payload.price);
    },
    setSelectedTickerName(state: TickerSliceState, action: PayloadAction<string | null>): void {
      state.selectedTickerName = action.payload;
    }
  },
});

export function selectTickerState(state: RootState): TickerSliceState {
  return state.ticker;
}

export const { addTicker, removeTicker, updateTicker, setSelectedTickerName } = tickerSlice.actions;

export default tickerSlice.reducer;