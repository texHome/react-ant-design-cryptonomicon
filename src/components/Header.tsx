import React, { FC, useEffect } from 'react';
import Search from './Search';
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
      <section className='container'><Search /></section>
    </div>
  );
};

export default Header;