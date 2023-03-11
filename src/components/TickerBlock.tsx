import React, { FC, useEffect, useRef, useState } from 'react';
import { removeTicker, selectTickerState, setSelectedTickerName, Ticker } from '../redux/slice/tickerSlice';
import { useAppDispatch } from '../redux/store';
import { unsubscribe } from '../api/api';
import { addPlotItem, clearPlotItems, setIsPlotActive } from '../redux/slice/plotSlice';
import { useSelector } from 'react-redux';
import { Avatar, Card, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';

const TickerBlock: FC<Ticker> = ({ name, price, url }) => {
  const dispatch = useAppDispatch();
  const { selectedTickerName } = useSelector(selectTickerState);
  const [isSelected, setSelected] = useState<boolean>(false);
  const tickerRef = useRef<HTMLDivElement>(null);

  function onRemoveClick(): void {
    dispatch(removeTicker(name));
    if (selectedTickerName === name) {
      dispatch(setSelectedTickerName(null));
      dispatch(clearPlotItems());
    }
    unsubscribe(name);
  }

  function onTickerClick(): void {
    setSelected(true);
    dispatch(setSelectedTickerName(name));
    dispatch(setIsPlotActive(true));
  }

  useEffect(() => {
    if (selectedTickerName !== name) {
      setSelected(false);
    }
  }, [name, selectedTickerName]);

  useEffect(() => {
    if (isSelected) {
      dispatch(addPlotItem(price));
    }
  }, [price]);


  return (
    // <div
    //   className={`bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer${isSelected && ' border-4'}`}>
    //   <div ref={tickerRef} onClick={onTickerClick} className='px-4 py-5 sm:p-6 text-center'>
    //     <dt className='text-sm font-medium text-gray-500 truncate'>
    //       {name} - USD
    //     </dt>
    //     <dd className='mt-1 text-3xl font-semibold text-gray-900'>
    //       {price}
    //     </dd>
    //   </div>
    //   <div className='w-full border-t border-gray-200'></div>
    //   <button
    //     onClick={onRemoveClick}
    //     className='flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none'>
    //     <svg
    //       className='h-5 w-5'
    //       xmlns='http://www.w3.org/2000/svg'
    //       viewBox='0 0 20 20'
    //       fill='#718096'
    //       aria-hidden='true'>
    //       <path
    //         fillRule='evenodd'
    //         d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
    //         clipRule='evenodd'
    //       ></path>
    //     </svg>
    //     Delete
    //   </button>
    // </div>
      <Card
        className={isSelected ? 'selected-ticker-border' : ""}
        title={
          <Meta
            style={{ justifyContent: 'center' }}
            avatar={<Avatar src={url} />}
            title={`${name} - USD`}
          />
        }
        hoverable
        bordered={true}
        style={{
          width: 300,
        }}
        actions={[
          <DeleteOutlined key='delete' onClick={onRemoveClick} />,
        ]}>

        <h2 onClick={onTickerClick} style={{ textAlign: 'center' }}>{price}</h2>
      </Card>
  );
};

export default TickerBlock;