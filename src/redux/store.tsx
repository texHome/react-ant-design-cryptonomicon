import storage from 'redux-persist/es/storage';
import thunk from 'redux-thunk'
import { Ticker, tickerReducer, TickerSliceState, updateTicker } from './slice/tickerSlice';
import { searchReducer } from './slice/searchSlice';
import { useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { subscribe } from '../api/api';
import { coinsReducer } from './slice/coinsSlice';
import { plotReducer } from './slice/plotSlice';

const tickerPersistConfig = {
  key: 'ticker',
  storage: storage,
  blacklist: ['selectedTickerName'],
};

const customPersistReducer = (reducer: any) => {
  return persistReducer(tickerPersistConfig, (state: any, action: PayloadAction<TickerSliceState>) => {
    if (action.type === 'persist/REHYDRATE') {
      if (action.payload && action.payload.tickers) {

        const tickers: Ticker[] = action.payload.tickers;
        tickers.forEach(ticker => {
          const handler = (newPrice: string) => {
            store.dispatch(updateTicker({ name: ticker.name, price: newPrice, url: '' }));
          };
          subscribe(ticker.name, handler);
        });
      }
    }
    return reducer(state, action);
  });
};

const reducers = combineReducers({
  coins: coinsReducer,
  ticker: customPersistReducer(tickerReducer),
  plot: plotReducer,
  search: searchReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof reducers>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const persistor = persistStore(store);
export default store;