import { Card, Skeleton } from 'antd';
import React from 'react';

const TickerSkeleton = () => {
  return (
    <Card
      bordered={true}
      style={{ width: 365, height:182 }}>
      <Skeleton />
    </Card>
  )
}

export default TickerSkeleton;