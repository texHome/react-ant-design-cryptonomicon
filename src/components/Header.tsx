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
    <section>
      <Search />
    </section>
  );
};

export default Header;