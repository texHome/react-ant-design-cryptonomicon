import React, { FC } from 'react';
import TickersPane from '../components/TickersPane';
import Plot from '../components/Plot';
import { useSelector } from 'react-redux';
import { selectPlotState } from '../redux/slice/plotSlice';
import { selectTickerState } from '../redux/slice/tickerSlice';

const Home: FC = () => {
  const { isPlotActive } = useSelector(selectPlotState);
  const { tickers } = useSelector(selectTickerState);

  return (
    <div>
      <TickersPane />
      {isPlotActive && <Plot />}
    </div>
  );
};

export default Home;