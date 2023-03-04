import React, { FC } from 'react';
import TickersPane from '../components/TickersPane';
import Plot from '../components/Plot';
import { useSelector } from 'react-redux';
import { selectPlotState } from '../redux/slice/plotSlice';

const Home: FC = () => {
  const { isPlotActive } = useSelector(selectPlotState);

  return (
    <div>
      <TickersPane />
      {isPlotActive && <Plot />}
    </div>
  );
};

export default Home;