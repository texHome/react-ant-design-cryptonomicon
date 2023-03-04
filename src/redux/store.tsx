import { configureStore } from '@reduxjs/toolkit';
import coins from './slice/coinsSlice';
import ticker from './slice/tickerSlice';
import plot from './slice/plotSlice';
import search from './slice/searchSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: { coins, ticker, plot, search },
});

export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export default store;