import React, { FC, useEffect } from 'react';
import SearchBlock from './SearchBlock';
import { fetchCoins } from '../redux/slice/coinsSlice';
import { useAppDispatch } from '../redux/store';

const Header: FC = () => {
  const dispatch = useAppDispatch();

  function getCoins() {
    dispatch(fetchCoins());
  }

  useEffect(() => {
    getCoins();
  }, []);

  return (
    <div className='container mx-auto flex flex-col items-center bg-gray-100 p-4  bg-gray-300'>
      <section className='container'><SearchBlock /></section>
    </div>
  );
};

export default Header;