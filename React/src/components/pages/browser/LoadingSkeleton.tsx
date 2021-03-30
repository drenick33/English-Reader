import React from 'react';
import { Skeleton } from 'antd';

const LoadingSkeleton = () => {
  return (
    <div className='site-card-wrapper'>
      <Skeleton avatar paragraph={{ rows: 4 }} />
    </div>
  );
};

export default LoadingSkeleton;
