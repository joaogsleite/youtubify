import React, { FC, useCallback, memo } from 'react';
import classNames from 'classnames';
import { dispatch, useSelector } from '../../reducers';
import './style.scss';

export interface ITabBarProps {
  icons: string[],
};

const TabBar: FC<ITabBarProps> = ({ icons }) => {

  const setActive = useCallback((index) => () => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: index });
  },[]);

  const active = useSelector((state) => state.activeTab);

  return (
    <div className="tab-bar">
      {icons.map((icon, index) => {
        const menuClasses = classNames({
          'active': index === active,
        })
        return (
          <li key={index} className={menuClasses} onClick={setActive(index)}>
            <i className={`fas fa-${icon}`}></i>
          </li> 
        )
      })}
    </div>
  );
};

export default memo(TabBar);