import React, { FC, memo } from 'react';
import './style.scss';

const Loading: FC = () => {
  return (
    <div className="loading"></div>
  );
};

export default memo(Loading);