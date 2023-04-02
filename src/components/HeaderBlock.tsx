import React, { FC, useEffect } from 'react';
import SearchBlock from './SearchBlock';
import { fetchCoins } from '../redux/slice/coinsSlice';
import { useAppDispatch } from '../redux/store';
import { Header } from 'antd/es/layout/layout';

const HeaderBlock: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCoins() as any);
  }, [dispatch]);

  return (
    <Header className='header'>
      <SearchBlock />
    </Header>
  );
};

export default HeaderBlock;