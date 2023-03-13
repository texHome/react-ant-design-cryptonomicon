import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { clearPlotItems, selectPlotState, setIsPlotActive } from '../redux/slice/plotSlice';
import { useAppDispatch } from '../redux/store';
import { selectTickerState, setSelectedTickerName } from '../redux/slice/tickerSlice';
import { Line, LineConfig } from '@ant-design/plots';
import { Button, Space, Tooltip } from 'antd';
import { CloseOutlined, SyncOutlined } from '@ant-design/icons';

const Plot = () => {
  const dispatch = useAppDispatch();
  const { items } = useSelector(selectPlotState);
  const { selectedTickerName } = useSelector(selectTickerState);
  const data = items.map((item) => ({ Date: item.date, Price: item.price }));

  const config: LineConfig = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'Price',
    animation: false,
    xAxis: {
      tickCount: 5,
    },
    yAxis: {
      min: getMin(),
    },
  };

  function onCloseClick(): void {
    dispatch(setIsPlotActive(false));
    dispatch(setSelectedTickerName(null));
    dispatch(clearPlotItems());
  }

  function clearPlot(): void {
    dispatch(clearPlotItems());
  }

  function getMin(): number {
    const numberItems: number[] = items.map(item => Number(item.price));
    return Math.min(...numberItems);
  }

  useEffect(() => {
    if (selectedTickerName === null) {
      dispatch(setIsPlotActive(false));
    }
    dispatch(clearPlotItems());
  }, [selectedTickerName]);


  return (
    <div>
      <div className='flex-row'>
        <h3>{selectedTickerName} - USD</h3>
        <div className = 'flex-row'>
          <Space wrap>
            <Tooltip title='Clear chart'>
              <Button shape='circle' icon={<SyncOutlined />} onClick={clearPlot} />
            </Tooltip>
            <Tooltip title='Close chart'>
              <Button shape='circle' icon={<CloseOutlined />} onClick={onCloseClick} />
            </Tooltip>
          </Space>
        </div>
      </div>
      <Line {...config} />
    </div>
  );
};

export default Plot;