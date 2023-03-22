import React, { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Coin, selectCoinsState } from '../redux/slice/coinsSlice';
import { useAppDispatch } from '../redux/store';
import { addTicker, selectTickerState, updateTicker } from '../redux/slice/tickerSlice';
import { BASE_URL, subscribe } from '../api/api';
import { selectSearchState, setCoinSearch, setTickerSearch } from '../redux/slice/searchSlice';
import Search from 'antd/es/input/Search';
import { SearchOutlined } from '@ant-design/icons';
import { Alert, AutoComplete, Input, Tag } from 'antd';

const SearchBlock: FC = () => {
  const dispatch = useAppDispatch();
  const { coins } = useSelector(selectCoinsState);
  const { coinSearch } = useSelector(selectSearchState);
  const { tickers } = useSelector(selectTickerState);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>('');
  const [autoCompleteList, setAutoCompleteList] = useState<string[]>([]);

  function onCoinSearchChange(input: string): void {
    dispatch(setCoinSearch(input));
    setShowWarning(false);
  }

  function onTickerSearchChange(event: ChangeEvent<HTMLInputElement>): void {
    dispatch(setTickerSearch(event.target.value));
  }

  useEffect(() => {
    coinSearch === '' ? setAutoCompleteList([]) : setAutoCompleteList(getAutoCompleteList());

  }, [coinSearch]);

  function getAutoCompleteList(): string[] {
    const coinList: Coin[] = getMatchedCoinsList();
    return coinList.length >= 4
      ? coinList.slice(0, 4).map((coin) => coin.Symbol)
      : coinList.slice(0, coinList.length).map((coin) => coin.Symbol);
  }

  function getMatchedCoinsList(): Coin[] {
    const primaryList: Coin[] = coins.filter((coin) =>
      coin.Symbol.toLowerCase() === coinSearch.toLowerCase());
    const secondaryList: Coin[] = coins.filter((coin) =>
      coin.Symbol.toLowerCase().startsWith(coinSearch.toLowerCase())
      && coin.Symbol.toLowerCase() !== coinSearch.toLowerCase())
      .filter(coin => coin.Symbol.toLowerCase() !== coinSearch.toLowerCase())
      .sort((coin1, coin2) => coin1.Symbol.length - coin2.Symbol.length);
    const tertiaryList: Coin[] = coins.filter((coin) =>
      coin.Symbol.toLowerCase().includes(coinSearch.toLowerCase())
      && !coin.Symbol.toLowerCase().startsWith(coinSearch.toLowerCase()))
      .sort((coin1, coin2) => coin1.Symbol.length - coin2.Symbol.length);

    return primaryList.concat(secondaryList).concat(tertiaryList);
  }

  function isTickerExists(name: string): boolean {
    return tickers
      .filter(ticker => ticker.name.toLowerCase() === name.toLowerCase()).length > 0;
  }

  function isCoinExists(name: string): boolean {
    return coins
      .filter(coin => coin.Symbol.toLowerCase() === name.toLowerCase()).length > 0;
  }

  function validateTickerName(name: string): string | null {
    let error: string | null = null;
    if (!isCoinExists(name)) {
      error = `Such coin doesn't exists`;
    } else if (isTickerExists(name)) {
      error = 'Such ticker exists';
    }
    return error;
  }

  function onAddClick(name: string): void {
    const error: string | null = validateTickerName(name);
    if (!error) {
      name = name.toUpperCase();
      const url: string = coins.filter(coin => coin.Symbol === name).map(coin => coin.ImageUrl)[0];
      dispatch(addTicker({ name: name, price: '-', url: `${BASE_URL}${url}` }));
      subscribe(name, getHandler(name));
    } else {
      setShowWarning(true);
      setWarning(error);
    }
  }

  function getHandler(name: string): (newPrice: string) => void {
    return (newPrice: string) => {
      dispatch(updateTicker({ name: name, price: newPrice, url: '' }));
    };
  }

  function onTickerSearchKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      dispatch(setTickerSearch(''));
    }
  }

  function getAutoComplete() {
    return autoCompleteList.map((symbol) => (
      {
        label:
          <Tag color='#2db7f5'
               onClick={() => onAddClick(symbol)}>
            {symbol}
          </Tag>,
        value: symbol,
      }
    ));
  }

  return (
    <div className='flex-row'>
      <div className='coin-search'>
        <AutoComplete
          style={{width: '100%'}}
          popupClassName='coin-search-dropdown'
          onChange={onCoinSearchChange}
          options={getAutoComplete()}>
          <Search
            placeholder='Add coin'
            allowClear
            enterButton='Add'
            size='large'
            onSearch={onAddClick} />
        </AutoComplete>
        {showWarning &&
          <Alert
            style={{ marginTop: 10 }}
            message={warning}
            type='warning'
            showIcon
            closable />}
      </div>
      <Input
        className='ticker-search'
        onChange={onTickerSearchChange}
        onKeyDown={onTickerSearchKeyPress}
        placeholder='Ticker search'
        allowClear
        size='large'
        prefix={<SearchOutlined style={{ opacity: 0.5 }} />}
      />
    </div>
  );
};

export default SearchBlock;