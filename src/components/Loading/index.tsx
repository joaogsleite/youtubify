import React, { FC, memo } from 'react';
import './style.scss';

const Loading: FC = () => {
  return (
    <i className="loading fas fa-spinner fa-pulse"></i>
  );
};

export default memo(Loading);