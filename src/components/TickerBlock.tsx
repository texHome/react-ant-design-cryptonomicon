import React, { FC, useEffect, useState } from 'react';
import { removeTicker, selectTickerState, setSelectedTickerName, Ticker } from '../redux/slice/tickerSlice';
import { useAppDispatch } from '../redux/store';
import { unsubscribe } from '../api/api';
import { addPlotItem, clearPlotItems, setIsPlotActive } from '../redux/slice/plotSlice';
import { useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';

const TickerBlock: FC<Ticker> = ({ name, price, url }) => {
  const dispatch = useAppDispatch();
  const { selectedTickerName } = useSelector(selectTickerState);
  const [isSelected, setSelected] = useState<boolean>(false);

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
    <Card
      className={isSelected ? 'selected-ticker-border' : ''}
      bodyStyle={{padding: 0}}
      title={
        <div onClick={onTickerClick}>
          <Meta
            avatar={<Avatar src={url} />}
            title={`${name} - USD`} />
        </div>
      }
      hoverable
      bordered={true}
      style={{ width: 365 }}
      actions={[
        <DeleteOutlined height={32} width={32} twoToneColor={'#1677ff'} key='delete' onClick={onRemoveClick} />,
      ]}>
      <h2 onClick={onTickerClick} style={{ textAlign: 'center', padding: 24, margin: 0 }}>{price}</h2>
    </Card>
  );
};

export default TickerBlock;