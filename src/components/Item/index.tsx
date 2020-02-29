import React, { memo, FC, useCallback } from 'react';
import { ITrack } from '../../services/player';
import './style.scss';
import { useSelector } from '../../reducers';
import classNames from 'classnames';

export interface IItemProps extends ITrack {
  onClick?: (video:ITrack) => void;
}

const Item: FC<IItemProps> = (props) => {
  const { title, thumbnail, onClick } = props
  const queue = useSelector((state) => state.queue);
  const playing = useSelector((state) => state.playing) || { id: null };
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(props);
    }
  }, [props, onClick])
  const itemClasses = classNames({
    'track-item': true,
    'enqueued': queue.find(item => item.id === props.id) || playing.id === props.id,
  })
  return (
    <div className={itemClasses} onClick={handleClick}>
      <img alt={title} src={thumbnail} />
      <h4>{title}</h4>
    </div>
  )
}

export default memo(Item);