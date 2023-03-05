import React, { useEffect, useState } from 'react';
import TickerBlock from './TickerBlock';
import { useSelector } from 'react-redux';
import { selectTickerState, Ticker } from '../redux/slice/tickerSlice';
import { selectSearchState } from '../redux/slice/searchSlice';
import Pagination from './Pagination';

const TickersPane = () => {
  const pageRangeDisplayed: number = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { tickers } = useSelector(selectTickerState);
  const { tickerSearch } = useSelector(selectSearchState);
  const filteredTickers: Ticker[] = getFilteredTickers();

  function getFilteredTickers(): Ticker[] {
   return tickers.filter(ticker => ticker.name.toLowerCase()
      .includes(tickerSearch.toLowerCase()));
  }

  function getPageTickers(): Ticker[] {
    return filteredTickers
      .slice(getFirstIndex(filteredTickers.length, currentPage), getLastIndex(filteredTickers.length, currentPage));
  }

  function getFirstIndex(tickersSize: number, page: number): number {
    if (page === 1) {
      return 0;
    } else {
      return ((page - 1) * pageRangeDisplayed);
    }
  }

  function getLastIndex(tickersSize: number, page: number) {
    if(page === getTotalPages(tickersSize)) {
      return tickersSize
    } else {
      return page * pageRangeDisplayed;
    }
  }

  function getTotalPages(tickersLength: number): number {
    return  Math.ceil(tickersLength / pageRangeDisplayed)
  }

  function onPageClick(page: number): void {
    setCurrentPage(page);
  }

  useEffect(() => {
  }, [tickerSearch, currentPage]);

  return (
    <>
      <div>
        <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3'>
          {
            getPageTickers().map((ticker, index) =>
              <TickerBlock key={index} name={ticker.name} price={ticker.price} />)
          }
        </dl>
      </div>
      {filteredTickers.length > pageRangeDisplayed &&
        <div className='flex items-center justify-center text-center mt-5'>
          <Pagination currentPage={currentPage} totalPages={getTotalPages(filteredTickers.length)}
                      onPageClick={onPageClick} />
        </div>}
    </>
  );
};

export default TickersPane;