import React, { useEffect } from 'react';
import TickerBlock from './TickerBlock';
import { useSelector } from 'react-redux';
import { selectTickerState, Ticker } from '../redux/slice/tickerSlice';
import { selectSearchState } from '../redux/slice/searchSlice';

const TickersPane = () => {
  const { tickers } = useSelector(selectTickerState);
  const { tickerSearch } = useSelector(selectSearchState);

  function getFilteredTickers(): Ticker[] {
    return tickers.filter(ticker => ticker.name.toLowerCase()
      .includes(tickerSearch.toLowerCase()))
  }

  useEffect(()=> {}, [tickerSearch])

  return (
    <div>
      <hr className='w-full border-t border-gray-600 my-4' />
      <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3'>
        {
          getFilteredTickers().map((ticker, index) =>
            <TickerBlock key={index} name={ticker.name} price={ticker.price} />)
        }
      </dl>
    </div>
  );
};

export default TickersPane;