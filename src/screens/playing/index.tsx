import React, { FC, memo } from 'react';
import { useSelector } from '../../reducers';
import { play } from '../../services/player';
import Item from '../../components/Item';
import './style.scss';

const PlayingScreen: FC = () => {
  const playing = useSelector((state) => state.playing);
  const queue = useSelector((state) => state.queue);
  return (
    <div className="playing-screen">
      <ul>
        <h2>Playing now:</h2>
        {playing 
          ? <Item {...playing} />
          : <p>(nothing is playing)</p>
        }
        <h2>Queue:</h2>
        {queue.length === 0 &&
          <p>(no items in queue)</p>
        }
        {queue.map((video, index) =>
          <Item key={index} {...video} onClick={play} />
        )}
      </ul>
      <audio autoPlay controls src={playing && playing.audioSrc}></audio>
    </div>
  )
}

export default memo(PlayingScreen);