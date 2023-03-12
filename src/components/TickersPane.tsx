import React, { useEffect, useState } from 'react';
import TickerBlock from './TickerBlock';
import { useSelector } from 'react-redux';
import { selectTickerState, Ticker } from '../redux/slice/tickerSlice';
import { selectSearchState } from '../redux/slice/searchSlice';
import { Col, Pagination, Row } from 'antd';

const TickersPane = () => {
  const pageRangeDisplayed: number = 8;
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

  const style = {
    background: '#0092ff',
    padding: '8px 0',
  };

  return (
    <>
      <Row gutter={[16, 24]}>
        {
          getPageTickers().map((ticker, index) =>
            <Col className="gutter-row" span={6}>
              <TickerBlock key={index} {...ticker} />
            </Col>
          )
        }
      </Row>
      {filteredTickers.length > pageRangeDisplayed &&
        <div style={{display: 'flex', justifyContent: 'center', padding: 15}}>
          <Pagination
            defaultCurrent={1}
            total={filteredTickers.length + 2}
            onChange={onPageClick}
          />
        </div>}
    </>
  );
};

export default TickersPane;