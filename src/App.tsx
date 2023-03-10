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
  // @ts-ignore
  return (
    // <Routes>
    //   <Route path='/' element={<MainLayout />}>
    //     <Route path={'/'} element={<Home />} />
    //   </Route>
    // </Routes>
    <Layout className='root'>
      <div className='container'>
        <Header className='header'>
          <SearchBlock />
        </Header>
        <Content>
          Content
        </Content>
        <Footer>Footer</Footer>
      </div>
    </Layout>
  );
}

export default App;
