import React, { FC } from 'react';
import { selectCoinsState } from '../redux/slice/coinsSlice';
import { useSelector } from 'react-redux';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import HeaderBlock from '../components/HeaderBlock';

const MainLayout: FC = () => {
  const { status } = useSelector(selectCoinsState);

  return (
  <Layout className='root'>
    <div className='container'>
      <HeaderBlock/>
      <Content className='content'>
        <Outlet />
      </Content>
      <Footer className='footer'>
        <div>
          <p>©2023 by <a className="font-semibold">Oleksii Zinkevych</a> All Rights Reserved</p>
        </div>
      </Footer>
    </div>
  </Layout>
  );
};

export default MainLayout;