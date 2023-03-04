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
    <div>
      <section>
        <Search />
      </section>
      <hr className='w-full border-t border-gray-600 my-4' />
    </div>
  );
};

export default Header;