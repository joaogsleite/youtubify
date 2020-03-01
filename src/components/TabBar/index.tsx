import React, { FC, useCallback, memo } from 'react';
import classNames from 'classnames';
import { dispatch, useSelector } from '../../reducers';
import './style.scss';

export interface ITabBarProps {
  tabs: Array<{ name: string, icon: string }>,
};

const TabBar: FC<ITabBarProps> = ({ tabs }) => {

  const setActive = useCallback((index) => () => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: index });
  },[]);

  const active = useSelector((state) => state.activeTab);

  return (
    <div className="tab-bar">
      {tabs.map((tab, index) => {
        const menuClasses = classNames({
          'active': index === active,
        })
        return (
          <li key={index} className={menuClasses} onClick={setActive(index)}>
            <i className={`fas fa-${tab.icon}`}></i>
          </li> 
        )
      })}
    </div>
  );
};

export default memo(TabBar);