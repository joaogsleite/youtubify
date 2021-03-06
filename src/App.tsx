import React, { FC, memo } from 'react';

import TabBar from './components/TabBar';
import TabScreen from './components/TabScreen';

import AccountScreen from './screens/account';
import PlayingScreen from './screens/playing';
import SearchScreen from './screens/search';

const App: FC = () => {
  return (
    <div className="app">
      <TabScreen 
        screens={[
          AccountScreen,
          PlayingScreen,
          SearchScreen,
        ]}
      />
      <TabBar
        icons={[
          'user',
          'waveform',
          'search',
        ]} 
      />
    </div>
  )
}

export default memo(App);
