import React, { FC, useState, memo } from 'react';
import classNames from 'classnames';

import AccountScreen from './screens/account';
import PlayingScreen from './screens/playing';
import SearchScreen from './screens/search';

import './App.scss';

const App: FC = () => {
  const [active, setActive] = useState<number>(1);
  const tabs = [
    { comp: AccountScreen, title: 'Account' },
    { comp: PlayingScreen, title: 'Playing' },
    { comp: SearchScreen, title: 'Search' },
  ]
  return (
    <div className="app">
      <div className="tabs">
        {tabs.map((tab, index) => {
          const tabClasses = classNames({ 
            'tab': true,
            'active': index === active,
          })
          const Comp = tab.comp as any
          return (
            <div key={index} className={tabClasses}>
              <Comp visible={index === active} />
            </div>
          )
        })}
      </div>
      <div className="menubar">
        {tabs.map((tab, index) => {
          const menuClasses = classNames({
            'active': index === active,
          })
          return (
            <li key={index} className={menuClasses} onClick={() => setActive(index)}>
              {tab.title}
            </li> 
          )
        })}
      </div>
    </div>
  )
}

export default memo(App);
