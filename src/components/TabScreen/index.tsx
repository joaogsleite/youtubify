import React, { FC, memo } from 'react';
import classNames from 'classnames';
import { useSelector } from '../../reducers';
import "./style.scss";

export interface ITabScreenProps {
  screens: React.NamedExoticComponent<{ visible: boolean }>[],
};

const TabScreen: FC<ITabScreenProps> = ({ screens }) => {

  const active = useSelector((state) => state.activeTab);

  return (
    <div className="tab-screens">
      {screens.map((Screen, index) => {
        const tabClasses = classNames({ 
          'tab-screen': true,
          'active': index === active,
        })
        return (
          <div key={index} className={tabClasses}>
            <Screen visible={index === active} />
          </div>
        )
      })}
    </div>
  );
};

export default memo(TabScreen);