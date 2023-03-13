import React from 'react';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import HeaderBlock from './components/HeaderBlock';
import SearchBlock from './components/SearchBlock';
import './assets/index.scss'


function App() {

  return (
    // <Routes>
    //   <Route path='/' element={<MainLayout />}>
    //     <Route path={'/'} element={<Home />} />
    //   </Route>
    // </Routes>
    <Layout className='root'>
      <div className='container'>
        <HeaderBlock/>
        <Content className='content'>
          <Home/>
        </Content>
        <Footer className='footer'>
          <div>
            <p>©2023 by <a className="font-semibold">Oleksii Zinkevych</a> All Rights Reserved</p>
          </div>
        </Footer>
      </div>
    </Layout>
  );
}

export default App;
