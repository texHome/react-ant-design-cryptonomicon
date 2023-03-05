import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Header from '../components/Header';
import { selectCoinsState, Status } from '../redux/slice/coinsSlice';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';

const MainLayout: FC = () => {
  const { status } = useSelector(selectCoinsState);

  return (
    <>
      <Header />
      <div className='container mx-auto flex flex-col items-center bg-gray-100 p-4'>
        <div className='container'>
          {status === Status.LOADING && <Spinner />}
          <Outlet />
        </div>
      </div>
      <Footer /></>
  );
};

export default MainLayout;