import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { clearPlotItems, selectPlotState, setIsPlotActive } from '../redux/slice/plotSlice';
import { useAppDispatch } from '../redux/store';
import { selectTickerState, setSelectedTickerName } from '../redux/slice/tickerSlice';
import { Column, ColumnConfig, Line, LineConfig } from '@ant-design/plots';
import { Button, Space, Tooltip, Radio } from 'antd';
import { CloseOutlined, SyncOutlined } from '@ant-design/icons';
import { RadioChangeEvent } from 'antd/es/radio/interface';

enum PlotType {
  LINE,
  BAR
}

const Plot = () => {
  const dispatch = useAppDispatch();
  const { items } = useSelector(selectPlotState);
  const { selectedTickerName } = useSelector(selectTickerState);
  const [type, setType] = useState<PlotType>(PlotType.LINE);
  const data = getData();

  function getData(): Object[] {
    switch (type) {
      case PlotType.BAR:
        return getBarData();
      case PlotType.LINE:
        return getLineData();
    }
  }

  function getBarData(): Object[] {
    let data = [];
    if (items.length < 2) {
      return [];
    }

    for (let i = 0; i < items.length - 1; i++) {
      data.push({ Date: items[i].date, Price: [items[i].price, items[i + 1].price] });
    }
    return data;
  }

  function getLineData(): Object[] {
    return items.map((item) => ({ Date: item.date, Price: item.price }));
  }


  const lineConfig: LineConfig = {
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

  const columnConfig: ColumnConfig = {
    data,
    xField: 'Date',
    yField: 'Price',
    isRange: true,
    animation: false,
    yAxis: {
      min: getMin(),
    },
    columnStyle: (data) => {
      const color = data.Price[0] > data.Price[1] ? 'red' : 'green';
      return { fill: color };
    },
    maxColumnWidth: 20,
    minColumnWidth: 15,
    limitInPlot: true,
  };

  function onTypeChange(event: RadioChangeEvent): void {
    setType(event.target.value)
  }

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
            <Radio.Group value={type} onChange={onTypeChange}>
              <Radio.Button value={PlotType.LINE}>Line</Radio.Button>
              <Radio.Button value={PlotType.BAR}>Bar</Radio.Button>
            </Radio.Group>
            <Tooltip title='Clear chart'>
              <Button icon={<SyncOutlined />} onClick={clearPlot} />
            </Tooltip>
            <Tooltip title='Close chart'>
              <Button icon={<CloseOutlined />} onClick={onCloseClick} />
            </Tooltip>
          </Space>
        </div>
      </div>
      {type === PlotType.LINE && <Line {...lineConfig} />}
      {type === PlotType.BAR && <Column {...columnConfig} />}
    </div>
  );
};

export default Plot;