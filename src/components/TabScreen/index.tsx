import React, { FC, memo } from 'react';
import classNames from 'classnames';
import { useSelector } from '../../reducers';
import "./style.scss";

export interface ITabScreenProps {
  tabs: React.NamedExoticComponent<{ visible: boolean }>[],
};

const TabScreen: FC<ITabScreenProps> = ({ tabs }) => {

  const active = useSelector((state) => state.activeTab);

  return (
    <div className="tab-screens">
      {tabs.map((Tab, index) => {
        const tabClasses = classNames({ 
          'tab-screen': true,
          'active': index === active,
        })
        return (
          <div key={index} className={tabClasses}>
            <Tab visible={index === active} />
          </div>
        )
      })}
    </div>
  );
};

export default memo(TabScreen);