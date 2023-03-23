import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type PlotItem = {
  price: string,
  date: string
}

type PlotSliceState = {
  isPlotActive: boolean,
  items: PlotItem[],
}

const initialState: PlotSliceState = {
  isPlotActive: false,
  items: [],
};

export const plotSlice = createSlice({
  name: 'plot',
  initialState,
  reducers: {
    addPlotItem(state: PlotSliceState, action: PayloadAction<string>): void {
      state.items.push({ price: action.payload, date: new Date().toLocaleTimeString('ru-RU') });
      if (state.items.length > 85) {
        state.items = state.items.slice(state.items.length - 85);
      }
    },
    clearPlotItems(state: PlotSliceState): void {
      state.items = [];
    },
    setIsPlotActive(state: PlotSliceState, action: PayloadAction<boolean>): void {
      state.isPlotActive = action.payload;
    },
  },
});

export function selectPlotState(state: RootState): PlotSliceState {
  return state.plot;
}

export const { addPlotItem, clearPlotItems, setIsPlotActive } = plotSlice.actions;

export default plotSlice.reducer;