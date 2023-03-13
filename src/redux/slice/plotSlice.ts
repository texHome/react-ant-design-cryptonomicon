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
    addPlotItem(state: PlotSliceState, action: PayloadAction<string>): any {
      state.items.push({price: action.payload, date: new Date().toLocaleTimeString('ru-RU')});
    },
    clearPlotItems(state: PlotSliceState) {
      state.items = [];
    },
    setIsPlotActive(state: PlotSliceState, action: PayloadAction<boolean>): any {
      state.isPlotActive = action.payload;
    },
  },
});

export function selectPlotState(state: RootState): PlotSliceState {
  return state.plot;
}

export const { addPlotItem, clearPlotItems, setIsPlotActive } = plotSlice.actions;

export default plotSlice.reducer;