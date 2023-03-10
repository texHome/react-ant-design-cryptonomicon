import React, { FC } from 'react';
import { selectCoinsState } from '../redux/slice/coinsSlice';
import { useSelector } from 'react-redux';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import SearchBlock from '../components/SearchBlock';

const MainLayout: FC = () => {
  const { status } = useSelector(selectCoinsState);

  return (
    //   <HeaderBlock />
    // <div className='container mx-auto flex flex-col items-center bg-gray-100 p-4'>
    //   <div className='container'>
    //     {status === Status.LOADING && <Spinner />}
    //     <Outlet />
    //   </div>
    // </div>
    // <Footer />
    <Layout>
      <Header style={{background: 'white'}}>
        <SearchBlock/>
      </Header>
      <Content>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default MainLayout;