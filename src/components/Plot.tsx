import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { clearPlotItems, selectPlotState, setIsPlotActive } from '../redux/slice/plotSlice';
import { useAppDispatch } from '../redux/store';
import { selectTickerState, setSelectedTickerName } from '../redux/slice/tickerSlice';

const Plot = () => {
  const dispatch = useAppDispatch();
  const { items } = useSelector(selectPlotState);
  const { selectedTickerName } = useSelector(selectTickerState);

  function onCloseClick(): void {
    dispatch(setIsPlotActive(false));
    dispatch(setSelectedTickerName(null));
    dispatch(clearPlotItems());
  }

  function getNormalizedHeight(price: string): number {
    const numberItems: number[] = items.map(Number);
    const max = Math.max(...numberItems);
    const min = Math.min(...numberItems);
    if (min === max) {
      return 50;
    } else {
      return 5 + ((Number(price) - min) * 95) / (max - min);
    }
  }

  function getStyle(price: string) {
    return {
      height: `${getNormalizedHeight(price)}%`,
    };
  }

  useEffect(() => {
    if (selectedTickerName === null) {
      dispatch(setIsPlotActive(false));
    }
    dispatch(clearPlotItems());
  }, [selectedTickerName]);

  return (
    <section className='relative'>
      <h3 className='text-lg leading-6 font-medium text-gray-900 my-8'>
        {selectedTickerName} - USD
      </h3>
      <div className='flex items-end border-gray-600 border-b border-l h-64'>
        {items.map((item, index) =>
          <div key={index} className='bg-purple-800 border w-10' style={getStyle(item)}></div>,
        )}
      </div>
      <button
        onClick={onCloseClick}
        type='button'
        className='absolute top-0 right-0'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          version='1.1'
          width='30'
          height='30'
          x='0'
          y='0'
          viewBox='0 0 511.76 511.76'>
          <g>
            <path
              d='M436.896,74.869c-99.84-99.819-262.208-99.819-362.048,0c-99.797,99.819-99.797,262.229,0,362.048    c49.92,49.899,115.477,74.837,181.035,74.837s131.093-24.939,181.013-74.837C536.715,337.099,536.715,174.688,436.896,74.869z     M361.461,331.317c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    l-75.413-75.435l-75.392,75.413c-4.181,4.16-9.643,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    c-8.341-8.341-8.341-21.845,0-30.165l75.392-75.413l-75.413-75.413c-8.341-8.341-8.341-21.845,0-30.165    c8.32-8.341,21.824-8.341,30.165,0l75.413,75.413l75.413-75.413c8.341-8.341,21.824-8.341,30.165,0    c8.341,8.32,8.341,21.824,0,30.165l-75.413,75.413L361.461,331.317z'
              fill='#718096'
              data-original='#000000'>

            </path>
          </g>
        </svg>
      </button>
    </section>
  );
};

export default Plot;