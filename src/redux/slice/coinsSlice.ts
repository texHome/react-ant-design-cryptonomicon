import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';


export const fetchCoins = createAsyncThunk<Coin[]>(
  'coins/fetchCoins',
  async () => {
    const data = await fetch(`https://min-api.cryptocompare.com/data/all/coinlist?summary=true`)
      .then(resp => resp.json())
      .then(json => json.Data);
    return Object.values(data) as Coin[];
  },
);

export enum Status {
  LOADING = 'loading',
  COMPLETED = 'completed',
  ERROR = 'error',
}

export interface Coin {
  FullName: string;
  Id: number;
  ImageUrl: string;
  Symbol: string;
}

type CoinsState = {
  coins: Coin[],
  status: Status
}

const initialState: CoinsState = {
  coins: [],
  status: Status.LOADING,
};

export const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCoins.fulfilled, (state, action) => {
      state.coins = action.payload;
      state.status = Status.COMPLETED;
    });
    builder.addCase(fetchCoins.pending, (state) => {
      state.coins = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchCoins.rejected, (state) => {
      state.coins = [];
      state.status = Status.ERROR;
    });
  },
});

export function selectCoinsState(state: RootState): CoinsState {
  return state.coins;
}

export const coinsReducer = coinsSlice.reducer;